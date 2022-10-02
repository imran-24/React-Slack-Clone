
// yarn add firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBP5gd9SdaFOb6Xv6F2RUr8ch89FVUdxAc",
    authDomain: "slack-clone-ca380.firebaseapp.com",
    projectId: "slack-clone-ca380",
    storageBucket: "slack-clone-ca380.appspot.com",
    messagingSenderId: "26242128435",
    appId: "1:26242128435:web:2b8a9362af4bf65f2e6146"
  }; 

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};
