import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRSikZSZ3JLvZSAIa3G0C9e3ecZCeeWpI",
  authDomain: "melomatch-b37aa.firebaseapp.com",
  projectId: "melomatch-b37aa",
  storageBucket: "melomatch-b37aa.appspot.com",
  messagingSenderId: "642748306086",
  appId: "1:642748306086:web:0cffcdf0462b044463da67",
  measurementId: "G-TYVW6RD01N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth and firestore instances
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;  // Export Firebase app instance
