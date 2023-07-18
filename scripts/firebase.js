import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// The configuration below is needed for the firebase-auth library to work
const firebaseConfig = {
    apiKey: "AIzaSyAIp_Vt7iYIV4IULb6YEGBUUAX1n5rgii4",
    authDomain: "class-timeline.firebaseapp.com",
    projectId: "class-timeline",
    storageBucket: "class-timeline.appspot.com",
    messagingSenderId: "11519234421",
    appId: "1:11519234421:web:913054831a17fca545033c",
    measurementId: "G-DE6E5VJVX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
