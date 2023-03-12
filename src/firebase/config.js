import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhk4m-y31737kj1w1aSZrdNtaJosPOsRU",
  authDomain: "firegallery-7308a.firebaseapp.com",
  projectId: "firegallery-7308a",
  storageBucket: "firegallery-7308a.appspot.com",
  messagingSenderId: "929130669825",
  appId: "1:929130669825:web:5b3f737e74aa987ac95d00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
