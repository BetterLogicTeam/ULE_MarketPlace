import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCK1ImiOqHZE2sZpMUaShOFjRXwc0Vqy8w",
  authDomain: "esrot-nft-marketplace.firebaseapp.com",
  projectId: "esrot-nft-marketplace",
  storageBucket: "esrot-nft-marketplace.appspot.com",
  messagingSenderId: "556337413197",
  appId: "1:556337413197:web:1463d42ca9c2f8d894f004",
  measurementId: "G-EPRG9035MQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();

export { auth, db, storageRef, storage };
