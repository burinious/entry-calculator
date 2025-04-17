import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebase = {
  apiKey: "AIzaSyAw8gHifPAPHrsZ-cZfTxi_SY5J9g7yCKM",
  authDomain: "entry-calculator-b3a9e.firebaseapp.com",
  projectId: "entry-calculator-b3a9e",
  storageBucket: "entry-calculator-b3a9e.firebasestorage.app",
  messagingSenderId: "444943033206",
  appId: "1:444943033206:web:e157f2686668e9e50e5057",
  measurementId: "G-MEZCP6XT3R"
};

const app = initializeApp(firebase);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);