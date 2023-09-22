// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR1Qc-FuK8Rq24hEtN9tag9w3_E4yQSU8",
  authDomain: "portfolio-dashboard-68b2a.firebaseapp.com",
  projectId: "portfolio-dashboard-68b2a",
  storageBucket: "portfolio-dashboard-68b2a.appspot.com",
  messagingSenderId: "717159293420",
  appId: "1:717159293420:web:454af7982d56477300a0c9",
  measurementId: "G-DFHEWZXC26"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();