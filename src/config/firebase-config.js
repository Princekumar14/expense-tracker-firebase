// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzxZqatPbrGesX7mPE5zT1Hz0Q8tBxz6U",
  authDomain: "expense-tracker-firebase-18baa.firebaseapp.com",
  projectId: "expense-tracker-firebase-18baa",
  storageBucket: "expense-tracker-firebase-18baa.appspot.com",
  messagingSenderId: "1080032205420",
  appId: "1:1080032205420:web:05167759f4f78b39f51649"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy