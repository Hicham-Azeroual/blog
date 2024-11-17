// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "meran-blog.firebaseapp.com",
  projectId: "meran-blog",
  storageBucket: "meran-blog.firebasestorage.app",
  messagingSenderId: "11448394541",
  appId: "1:11448394541:web:a6c31f8fee9a9d6372e9a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
