import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions'

const otherAppConfig = {
  apiKey: "AIzaSyAwexk_NRJcBWs0bAsK7Fw4bRTH70GVro8",
  authDomain: "sellamoment-d0e48.firebaseapp.com",
  projectId: "sellamoment-d0e48",
  storageBucket: "sellamoment-d0e48.appspot.com",
  messagingSenderId: "948446557523",
  appId: "1:948446557523:web:76f22013c82ef046255da6",
  measurementId: "G-651N0JSDZC"
};

firebase.initializeApp({
    apiKey: "AIzaSyA9U-elrkzomnWP1RLmZKikSXutNPe43iU",
    authDomain: "research-pub.firebaseapp.com",
    projectId: "research-pub",
    storageBucket: "research-pub.appspot.com",
    messagingSenderId: "555865560719",
    appId: "1:555865560719:web:b8f3a2bbe97af2c210c2fa",
    measurementId: "G-J5FJ7LQQ8N"
  });

  firebase.initializeApp(otherAppConfig, 'SellaApp');

const projectStorage = firebase.storage();
const projectFirestore = firebase.app('SellaApp').firestore();
const projectAuth = firebase.app('SellaApp').auth();
const projectFunctions = firebase.app('SellaApp').functions();
const date =firebase.firestore.FieldValue.serverTimestamp();


export { projectStorage, projectFirestore,projectAuth,projectFunctions,date};