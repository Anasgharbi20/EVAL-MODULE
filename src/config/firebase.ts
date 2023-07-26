// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0nxA97YZOihZ3arszPeigoMLqHiEQOKo",
  authDomain: "eval-dc54c.firebaseapp.com",
  projectId: "eval-dc54c",
  storageBucket: "eval-dc54c.appspot.com",
  messagingSenderId: "637383537918",
  appId: "1:637383537918:web:3d3039cc042ed0da42e1af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;