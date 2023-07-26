import {collection, getFirestore} from "firebase/firestore";
import app from "./firebase";
  
  export const firestore = getFirestore(app);
  export const formsCollection = collection(firestore, "forms");
  export const usersCollection = collection(firestore, "users");
  export const resultsCollection = collection(firestore, "results");

  