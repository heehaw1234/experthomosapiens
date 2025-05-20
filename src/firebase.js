// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqMrnDJGHQUuItjb5V0xkgZ99HRhN2vMs",
  authDomain: "noteit-32719.firebaseapp.com",
  projectId: "noteit-32719",
  storageBucket: "noteit-32719.firebasestorage.app",
  messagingSenderId: "823904295843",
  appId: "1:823904295843:web:0678a27b168e26061cd816",
  measurementId: "G-ZCM978BP6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default app;