import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBi--vls0FU4CUQehS-t90v88o0wbAndmw",
  authDomain: "cash-connect-86b77.firebaseapp.com",
  projectId: "cash-connect-86b77",
  storageBucket: "cash-connect-86b77.appspot.com",
  messagingSenderId: "909313339595",
  appId: "1:909313339595:web:bfa05c14d893195a3bab4e",
  measurementId: "G-77JNC4CG6V"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
console.log('initialize running');

export const storage = getStorage(firebase);
console.log('storage running');

export const db = getFirestore(firebase);
console.log('DB firestrore running');

export const auth = getAuth(firebase);
