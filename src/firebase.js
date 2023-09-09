import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBOJPTsnIkIvGRw-Bw_537phU_ya0rqqxk",
  authDomain: "garment-7bb85.firebaseapp.com",
  projectId: "garment-7bb85",
  storageBucket: "garment-7bb85.appspot.com",
  messagingSenderId: "1033264238805",
  appId: "1:1033264238805:web:b3192089cf07ea5f8f125c",
  measurementId: "G-TW6BD70BRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


