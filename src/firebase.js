// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyA6GDlCyeJLnQOLkaqBSGH1q2mDHrE4ivo",
  authDomain: "dashboardauth-17633.firebaseapp.com",
  projectId: "dashboardauth-17633",
  storageBucket: "dashboardauth-17633.firebasestorage.app",
  messagingSenderId: "704437178292",
  appId: "1:704437178292:web:3746b83277e4a3fa782ce1",
  measurementId: "G-FBGEJYSELM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);