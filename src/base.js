import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBtcLyE-aQSD_Hp0zkz5ROCr-T6glsdPko",
    authDomain: "catch-of-the-day-ca231.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ca231.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;