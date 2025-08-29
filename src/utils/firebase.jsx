import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAre4aF2ii_XZiNKgD31HO5c0PonedhmPo",
  authDomain: "giffyauthhentication.firebaseapp.com",
  projectId: "giffyauthhentication",
  storageBucket: "giffyauthhentication.firebasestorage.app",
  messagingSenderId: "269453059801",
  appId: "1:269453059801:web:70fbd466d47e405ddec0c8",
  measurementId: "G-HK1HJ8109V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);