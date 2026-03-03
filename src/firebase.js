// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDh8yg8Kn7i5Lf6PWrBgnZbFt-nYOdmY_M",
    authDomain: "haikuatry.firebaseapp.com",
    databaseURL: "https://haikuatry-default-rtdb.firebaseio.com",
    projectId: "haikuatry",
    storageBucket: "haikuatry.appspot.com",
    messagingSenderId: "323364509037",
    appId: "1:323364509037:web:69439cdab6fef30dc1f664",
    measurementId: "G-8STY4LB7VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);