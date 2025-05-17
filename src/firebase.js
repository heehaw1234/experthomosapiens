// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOTpgPh-iLS1C-WBK6JcAcjJRhU0Z76aE",
    authDomain: "note-it-f7b07.firebaseapp.com",
    projectId: "note-it-f7b07",
    storageBucket: "note-it-f7b07.firebasestorage.app",
    messagingSenderId: "915849440524",
    appId: "1:915849440524:web:315b522550a6e1985cad29",
    measurementId: "G-W7CNE11KGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;