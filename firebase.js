import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCtJg78HuHFKZeHCBVh4ZdCchdJyvocGw8",
    authDomain: "chatapp-71ccb.firebaseapp.com",
    projectId: "chatapp-71ccb",
    storageBucket: "chatapp-71ccb.appspot.com",
    messagingSenderId: "302951124433",
    appId: "1:302951124433:web:cec457d3eb2868a573e4f0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
