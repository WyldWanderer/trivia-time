import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw44mpMlF26o0o1hpKASztxViH9dfqHNQ",
  authDomain: "dev-trivia-time.firebaseapp.com",
  databaseURL: "https://dev-trivia-time-default-rtdb.firebaseio.com",
  projectId: "dev-trivia-time",
  storageBucket: "dev-trivia-time.appspot.com",
  messagingSenderId: "148296333893",
  appId: "1:148296333893:web:d62d28c46f199f1a41412c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)