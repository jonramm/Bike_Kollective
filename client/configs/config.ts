// resource: https://vikrantbhat.hashnode.dev/how-to-add-environment-variables-in-a-react-native-project-with-ts
import {REACT_APP_FIREBASE_KEY, REACT_APP_FIREBASE_DOMAIN, REACT_APP_FIREBASE_DATABASE, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_SENDER_ID, REACT_APP_FIREBASE_APP_ID, REACT_APP_CLIENT_ID, REACT_APP_EXPO_CLIENT_ID, REACT_APP_ANDROID_CLIENT_ID, REACT_APP_IOS_CLIENT_ID} from '@env';

// contains global configurations for firebase
const config = {
    firebase: {
        apiKey: process.env.REACT_APP_FIREBASE_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        clientId: process.env.REACT_APP_CLIENT_ID,
        expoClientId: process.env.REACT_APP_EXPO_CLIENT_ID,
        androidClientId: process.env.REACT_APP_ANDROID_CLIENT_ID,
        iosClientId: process.env.REACT_APP_IOS_CLIENT_ID,
    }
}

// console.log(config.firebase.expoClientId)

export default config;