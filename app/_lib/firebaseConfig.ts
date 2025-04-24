import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFMGTGD9zrlPWqLlLj6C7ji4spG75bid4",
  authDomain: "kaya-9c281.firebaseapp.com",
  projectId: "kaya-9c281",
  storageBucket: "kaya-9c281.firebasestorage.app",
  messagingSenderId: "390791983354",
  appId: "1:390791983354:web:f94239ad107c7fcaa65943",
  measurementId: "G-Q9J8Q2KPFM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
