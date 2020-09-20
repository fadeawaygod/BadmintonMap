import { createApp } from 'vue'
import App from './App.vue'

// firebase
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDVXUzJwEF3RrwqGBkhYCoovgt4prnIiIs",
    authDomain: "badmintonmap.firebaseapp.com",
    databaseURL: "https://badmintonmap.firebaseio.com",
    projectId: "badmintonmap",
    storageBucket: "badmintonmap.appspot.com",
    messagingSenderId: "685199554944",
    appId: "1:685199554944:web:c0e63a6eb16b194df3a965",
    measurementId: "G-QNHGNYWGYR"
};
firebase.initializeApp(firebaseConfig);

createApp(App).mount('#app')
