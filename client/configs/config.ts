// resource: https://vikrantbhat.hashnode.dev/how-to-add-environment-variables-in-a-react-native-project-with-ts
// import {ENV_VAR} from '@env';

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
    }
}

export default config;