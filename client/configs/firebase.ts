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
const expo_client_id = config.firebase.expoClientId;
const android_client_id = config.firebase.androidClientId;
const ios_client_id = config.firebase.iosClientId;

export { firebase, auth, db, storage, provider, client_id, expo_client_id, android_client_id, ios_client_id};