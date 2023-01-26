import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, connectAuthEmulator } from "firebase/auth";
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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
// connectAuthEmulator(auth, "http://127.0.0.1:9099"); // emulator not working, defaulting to prod

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = (provider: firebase.auth.AuthProvider) =>
    new Promise<firebase.auth.UserCredential>((resolve, reject) => {
        auth.signInWithPopup(provider)
            .then(result => resolve(result))
            .catch(error => reject(error));
});

export {firebase, auth, provider, signInWithGoogle};