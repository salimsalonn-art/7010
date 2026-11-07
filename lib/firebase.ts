import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNwsP5tgfapsvx0xpGym3J8k69ab5YaOw",
  authDomain: "advisory-b1c10.firebaseapp.com",
  projectId: "advisory-b1c10",
  storageBucket: "advisory-b1c10.firebasestorage.app",
  messagingSenderId: "975903029538",
  appId: "1:975903029538:web:c57317836119341b6b4d7b",
  measurementId: "G-X68PVSPE2G"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);