// Your web app's Firebase configuration
import firebase from 'firebase';
require('@firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyCFQ9TRNSciBTCOSJgjnaPqS1ID_9-L4pw",
    authDomain: "book-santa-app-8b12a.firebaseapp.com",
    databaseURL: "https://book-santa-app-8b12a.firebaseio.com",
    projectId: "book-santa-app-8b12a",
    storageBucket: "book-santa-app-8b12a.appspot.com",
    messagingSenderId: "55984798445",
    appId: "1:55984798445:web:917e931dc4fe7b8f822ae4"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();