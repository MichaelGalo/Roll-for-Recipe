// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWyAQ5XTPHa76bfxSMO_DGRfW6oKs_w2A",
  authDomain: "roll-for-recipe.firebaseapp.com",
  databaseURL: "https://roll-for-recipe-default-rtdb.firebaseio.com",
  projectId: "roll-for-recipe",
  storageBucket: "roll-for-recipe.appspot.com",
  messagingSenderId: "1079068155032",
  appId: "1:1079068155032:web:7f87692850394edc7744ed",
  measurementId: "G-Q0SEV92DRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app);