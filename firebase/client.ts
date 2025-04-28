// Import the functions you need from the SDKs you need
import { initializeApp , getApp, getApps} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJU-Rq3hRnCMEfgV5xqdj4aLJt1JCqazM",
  authDomain: "ai-mockprep.firebaseapp.com",
  databaseURL: "https://ai-mockprep-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ai-mockprep",
  storageBucket: "ai-mockprep.firebasestorage.app",
  messagingSenderId: "1049852855665",
  appId: "1:1049852855665:web:71e599994f55e4b66c62d0",
  measurementId: "G-VKHYLJS9QV"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);