import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAc7N81EZHHjeZRxJdJstEOlcbQ29Pp6rk",
    authDomain: "savedatmoney-6020a.firebaseapp.com",
    databaseURL: "https://savedatmoney-6020a.firebaseio.com",
    projectId: "savedatmoney-6020a",
    storageBucket: "savedatmoney-6020a.appspot.com",
    messagingSenderId: "708570009116",
    appId: "1:708570009116:web:db8b4f0adb8a88095fd9d9",
    measurementId: "G-E03V4J17J6",

  };

  firebase.initializeApp(firebaseConfig);

  export { firebase };