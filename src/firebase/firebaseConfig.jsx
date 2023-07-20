// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBaJ8blkIuWTN9qSYR83AHU6MBEdJVBbVU",
  authDomain: "sharepal-494cb.firebaseapp.com",
  projectId: "sharepal-494cb",
  storageBucket: "sharepal-494cb.appspot.com",
  messagingSenderId: "388795619723",
  appId: "1:388795619723:web:0d29f8f9fc7b71f2ac778e",
  measurementId: "G-42V6R9M397",
  databaseURL: "https://sharepal-494cb-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
