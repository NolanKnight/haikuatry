import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "haikuatry.firebaseapp.com",
  databaseURL: "https://haikuatry-default-rtdb.firebaseio.com",
  projectId: "haikuatry",
  storageBucket: "haikuatry.appspot.com",
  messagingSenderId: "323364509037",
  appId: "1:323364509037:web:69439cdab6fef30dc1f664",
  measurementId: "G-8STY4LB7VQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
