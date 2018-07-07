// Hookup firebase to Single Page App

//Node Modules
import Rebase from 're-base';
import firebase from 'firebase';

// Initialize with apiKey, authDomain, databaseURL
// These are retrieved in firebase console
// Should be unique to each application
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBtcLyE-aQSD_Hp0zkz5ROCr-T6glsdPko",
    authDomain: "catch-of-the-day-ca231.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ca231.firebaseio.com"
});

//Connect to firebase atabase
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;