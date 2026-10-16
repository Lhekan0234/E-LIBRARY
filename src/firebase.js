import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyA2T4KgB32wb8_6QEhbamAncs5m2yzixqc",
  authDomain: "e-book-library-8b0a2.firebaseapp.com",
  projectId: "e-book-library-8b0a2",
  storageBucket: "e-book-library-8b0a2.firebasestorage.app",
  messagingSenderId: "885600719089",
  appId: "1:885600719089:web:c7f82c7a4e6c3a6e09d950",
  measurementId: "G-GDN8JQEZCW"
};

const app = initializeApp(firebaseConfig);

// YOU MUST INCLUDE 'export const' HERE:
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);