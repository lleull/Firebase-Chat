// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-d024d.firebaseapp.com",
  projectId: "react-chat-d024d",
  storageBucket: "react-chat-d024d.appspot.com",
  messagingSenderId: "442621867356",
  appId: "1:442621867356:web:d5b5799f2ca71e9ea07d99",
  measurementId: "G-VE8X41LHYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);