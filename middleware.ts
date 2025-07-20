import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public paths
  const publicPaths = [
    '/sign-in',
    '/sign-up',
    '/_next',
    '/api',
    '/favicon.ico'
  ];

  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // Allow static files
  if (pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)) {
    return NextResponse.next();
  }
  
  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // For all other paths, check authentication
  const sessionCookie = request.cookies.get('session');
  
  if (!sessionCookie || !sessionCookie.value) {
    // Redirect to sign-in if no valid session
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
