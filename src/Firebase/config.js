import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'


firebase.initializeApp({
    apiKey: "AIzaSyA9U-elrkzomnWP1RLmZKikSXutNPe43iU",
    authDomain: "research-pub.firebaseapp.com",
    projectId: "research-pub",
    storageBucket: "research-pub.appspot.com",
    messagingSenderId: "555865560719",
    appId: "1:555865560719:web:b8f3a2bbe97af2c210c2fa",
    measurementId: "G-J5FJ7LQQ8N"
  });

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth()

export { projectStorage, projectFirestore,projectAuth};