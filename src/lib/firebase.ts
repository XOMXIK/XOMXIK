import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBrmDsvRd3jMbokA4gleBaC_7mfzWpS-Lk",
  authDomain: "xomxik-b4d45.firebaseapp.com",
  projectId: "xomxik-b4d45",
  storageBucket: "xomxik-b4d45.firebasestorage.app",
  messagingSenderId: "370997782530",
  appId: "1:370997782530:web:9740b32335293f2cdd1f1b",
  measurementId: "G-Z24FMFJN58",
};

const app = initializeApp(firebaseConfig);

const analytics =
  typeof window !== "undefined" ? isSupported().then((yes) => (yes ? getAnalytics(app) : null)) : null;

export { app, analytics };
