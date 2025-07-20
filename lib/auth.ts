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
    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email,
      name: decodedClaims.name || decodedClaims.email
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
