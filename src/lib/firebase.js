
import React from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "firstapp-57210.firebaseapp.com",
  projectId: "firstapp-57210",
  storageBucket: "firstapp-57210.appspot.com",
  messagingSenderId: "963738841306",
  appId: "1:963738841306:web:a63202a4def9cc65c135e3",
  measurementId: "G-7H1XYZ5HFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)



