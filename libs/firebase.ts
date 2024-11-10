import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQJaeZk5_DtujigySLFMY8beQZxsoGMDQ",
  authDomain: "shopease-vid.firebaseapp.com",
  projectId: "shopease-vid",
  storageBucket: "shopease-vid.firebasestorage.app",
  messagingSenderId: "803447053355",
  appId: "1:803447053355:web:f4418a69380d1119395e6e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;