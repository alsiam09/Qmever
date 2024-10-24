// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxuySjLLS2HOsb4io4KIy3Up3mTdgCDOk",
  authDomain: "rupkotha-a706e.firebaseapp.com",
  databaseURL: "https://rupkotha-a706e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rupkotha-a706e",
  storageBucket: "rupkotha-a706e.appspot.com",
  messagingSenderId: "855471914009",
  appId: "1:855471914009:web:49ee8dc1aace701243be88",
  measurementId: "G-RBNS1T1XTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth

export { auth }

export default firebaseConfig