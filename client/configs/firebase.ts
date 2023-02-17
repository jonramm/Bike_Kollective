import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, connectAuthEmulator, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";
import config from "./config";

console.log(config);

const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = firebase.auth();
const provider = firebase.auth.GoogleAuthProvider;
const client_id = config.firebase.clientId;

export { firebase, auth, db, storage, provider, client_id};