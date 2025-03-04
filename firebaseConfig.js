// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVJyYxMpp7qvvca068DsABPga4JPJRAIU",
  authDomain: "esummit2k25.firebaseapp.com",
  projectId: "esummit2k25",
  storageBucket: "esummit2k25.firebasestorage.app",
  messagingSenderId: "483435906330",
  appId: "1:483435906330:web:519cf93ed05c7ad27f58a3",
  measurementId: "G-YBLK8H5K65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

export { database, ref, push, db };
