import {
    initializeApp
} from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "pomodoro-timer-clockify.firebaseapp.com",
    projectId: "pomodoro-timer-clockify",
    storageBucket: "pomodoro-timer-clockify.appspot.com",
    messagingSenderId: "98342232404",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const firebase = initializeApp(config);

export {
    firebase
}