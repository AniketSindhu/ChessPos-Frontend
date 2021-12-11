import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBByO1a0BmKbZdyc26NZbzgyP26lv1C4kU",
  authDomain: "chesspos-b5d1e.firebaseapp.com",
  projectId: "chesspos-b5d1e",
  storageBucket: "chesspos-b5d1e.appspot.com",
  messagingSenderId: "1045877839611",
  appId: "1:1045877839611:web:3a12537a8d4558f45d425e",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default db;
