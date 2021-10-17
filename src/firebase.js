// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "crud-simple-app-udemy.firebaseapp.com",
  projectId: "crud-simple-app-udemy",
  storageBucket: "crud-simple-app-udemy.appspot.com",
  messagingSenderId: "704944000617",
  appId: "1:704944000617:web:9c600c494a0ae8d3d09cf8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase};