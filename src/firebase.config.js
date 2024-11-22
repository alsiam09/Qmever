// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAUiRjQwcIDRiNkj_JusiTpOKJFmat1J-w",
  authDomain: "qmever-6b3c3.firebaseapp.com",
  databaseURL: "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qmever",
  storageBucket: "qmever.firebasestorage.app",
  messagingSenderId: "527170940876",
  appId: "1:527170940876:web:1f3fb31600c5a009387769"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth

export { auth }

export default firebaseConfig