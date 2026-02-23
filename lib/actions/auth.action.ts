'use server';

import { db,auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export  async function signUp(params:SignUpParams) {
    const {uid, name , email} = params; // Remove password from destructuring

    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return{
                success: false,
                message : 'User already exists. Please sign in instead'
            }
        }
        
        await db.collection('users').doc(uid).set({
            name , email
        })

        return { 
            success : true,
            message : "Account setup completed successfully."
        }

    }catch(e: unknown){
        console.error('Error creating a user',e);
        
        const error = e as { code?: string };
        if(error.code === 'auth/email-already-exist'){
            return{
                success : false,
                message : 'This email is already in use'
            }
        }
        return{
            success: false,
            message : 'Failed to create an account'
        }
    }
    
} 

export async function signIn(params:SignInParams) {
    const {email,idToken} = params;
    try{
        // Verify the ID token and check email verification
        const decodedToken = await auth.verifyIdToken(idToken);
        
        if (!decodedToken.email_verified) {
            return {
                success: false,
                message: 'Please verify your email before signing in. Check your inbox for verification email.'
            };
        }

        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return{
                success : false,
                message : 'User does not exist . Create an account instead'
            }
        }

        await  setSessionCookie(idToken);

        return {
            success: true,
            message: "Successfully signed in"
        }

    } catch(e: unknown){
        console.log(e);

        const authError = e as { code?: string }

        if (authError.code === 'auth/id-token-expired') {
            return {
                success: false,
                message: 'Session expired. Please sign in again.'
            };
        } else if (authError.code === 'auth/invalid-id-token') {
            return {
                success: false,
                message: 'Invalid authentication token. Please sign in again.'
            };
        }

        return {
            success : false,
            message : "Failed to log in Account "
        }
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn : ONE_WEEK * 1000,
    })

    cookieStore.set('session', sessionCookie,{
        maxAge :ONE_WEEK,
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        path : '/',
        sameSite : 'lax'
    })
}

export async function logout() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('session');
        
        return {
            success: true,
            message: 'Logged out successfully'
        };
    } catch (error) {
        console.error('Error during logout:', error);
        return {
            success: false,
            message: 'Failed to logout'
        };
    }
}

export async function updateUserDisplayName(uid: string, displayName: string) {
    try {
        // Update the user's display name in Firebase Auth
        await auth.updateUser(uid, {
            displayName: displayName
        });

        // Also update in Firestore for consistency
        await db.collection('users').doc(uid).update({
            name: displayName
        });

        return {
            success: true,
            message: 'Profile updated successfully'
        };
    } catch (error) {
        console.error('Error updating user display name:', error);
        return {
            success: false,
            message: 'Failed to update profile'
        };
    }
}