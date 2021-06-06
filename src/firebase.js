// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";



  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCldMg0iqCbriUuxO5j7Y7UyVuNBWgA_wo",
  authDomain: "instagram-clone-7f1ad.firebaseapp.com",
  projectId: "instagram-clone-7f1ad",
  storageBucket: "instagram-clone-7f1ad.appspot.com",
  messagingSenderId: "26836656605",
  appId: "1:26836656605:web:848e30c2a41efb49d05634",
  measurementId: "G-TLLEFQ9ZLQ"
}) ;
 

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };

  //export default db