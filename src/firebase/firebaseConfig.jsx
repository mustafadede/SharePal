// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_REACT_APP_FIREBASE_API}`,
  authDomain: `${import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_REACT_APP_FIREBASE_APP_MEASUREMENT_ID}`,
  databaseURL: `${import.meta.env.VITE_REACT_APP_FIREBASE_APP_DATABASE_URL}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
