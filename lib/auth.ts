import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/firebase/admin";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie.value, true);
    
    // Get the user record to access displayName
    const userRecord = await auth.getUser(decodedClaims.uid);
    
    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email,
      name: userRecord.displayName || decodedClaims.name || 'User'  // Use displayName first
    };
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }
  return user;
}
