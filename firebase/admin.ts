import {getFirestore} from 'firebase-admin/firestore'
import {getAuth} from "firebase-admin/auth";
import {initializeApp, getApps,cert} from 'firebase-admin/app';

const initFirebaseAdmin = () => {
    const app = getApps();

    if (!app.length) {
        try {
            // Skip initialization during build if env vars are missing
            if (!process.env.FIREBASE_ADMIN_PROJECT_ID) {
                console.log('Skipping Firebase Admin initialization - missing environment variables');
                return null;
            }

            initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n")
                })
            });
        } catch (error) {
            console.error('Failed to initialize Firebase Admin:', error);
            return null;
        }
    }

    try {
        return {
            auth: getAuth(),
            db: getFirestore()
        }
    } catch (error) {
        console.error('Error getting Firebase services:', error);
        return null;
    }
}

const firebaseAdmin = initFirebaseAdmin();

export const auth = firebaseAdmin?.auth as any;
export const db = firebaseAdmin?.db as any;