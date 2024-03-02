import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAnKJCOlB3G12DpVuIbXUbgqEX5nn2Aui0",
  authDomain: "tenant-a8edb.firebaseapp.com",
  databaseURL: "https://tenant-a8edb-default-rtdb.firebaseio.com",
  projectId: "tenant-a8edb",
  storageBucket: "tenant-a8edb.appspot.com",
  messagingSenderId: "588788064721",
  appId: "1:588788064721:web:21e76796bdc6495b2680f0",
  measurementId: "G-J7SF7HLCC7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const imageDb = getStorage(app)

export { db, auth,imageDb };
// export const  imageDb = getStorage(app)
