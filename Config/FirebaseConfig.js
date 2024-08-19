// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloud-file-manager-abf20.firebaseapp.com",
  projectId: "cloud-file-manager-abf20",
  storageBucket: "cloud-file-manager-abf20.appspot.com",
  messagingSenderId: "717949472381",
  appId: "1:717949472381:web:11b1089106c57c39d6eb14",
  measurementId: "G-QW6F03CT98"
};


export const app = initializeApp(firebaseConfig);
