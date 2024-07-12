import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {

  apiKey: "AIzaSyDVuIDnhZdJvzBrDm5axXUjO-yE5bYAM9Y",
  authDomain: "todo-f73c4.firebaseapp.com",
  // databaseURL: "https://todo-f73c4-default-rtdb.firebaseio.com",
  projectId: "todo-f73c4",
  storageBucket: "todo-f73c4.appspot.com",
  messagingSenderId: "936423378893",
  appId: "1:936423378893:web:574572518393ebd6cdfe84",
  measurementId: "G-RQF7PYC3J8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };