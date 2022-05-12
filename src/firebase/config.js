import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc1GIwuM9hGW9b-_0mGXbwBfa41JzKN98",
  authDomain: "recipe-app-ee508.firebaseapp.com",
  projectId: "recipe-app-ee508",
  storageBucket: "recipe-app-ee508.appspot.com",
  messagingSenderId: "401825885130",
  appId: "1:401825885130:web:af1405e64e4e2892a77d33",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
