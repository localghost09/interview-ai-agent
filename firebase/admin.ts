import {getFirestore} from 'firebase-admin/firestore'
import {getAuth} from "firebase-admin/auth";
import {initializeApp, getApps,cert} from 'firebase-admin/app';
const initFirebaseAdmin = () => {
    const app = getApps();

    if (!app.length) {
        try {
            initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n")
                })
            });
        } catch (error) {
            console.error('Failed to initialize Firebase Admin:', error);
            throw error;
        }
    }

    return {
        auth: getAuth(),
        db: getFirestore()
    }
}

export const {auth,db} = initFirebaseAdmin();