import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyC0SFeuukCHSJciE8rSfVSYqTxoOcwqmik",
  authDomain: "geresu-11b16.firebaseapp.com",
  projectId: "geresu-11b16",
  storageBucket: "geresu-11b16.appspot.com",
  messagingSenderId: "178870080980",
  appId: "1:178870080980:web:318c61fefd906aba7b3241",
  measurementId: "G-7D9QBGBYEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


