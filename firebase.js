import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyAfUHNEvBwQzzfLqPdkuYdBVyEHVAg08dk',
  authDomain: 'kshitij-c8821.firebaseapp.com',
  projectId: 'kshitij-c8821',
  storageBucket: 'kshitij-c8821.appspot.com',
  messagingSenderId: '736109545492',
  appId: '1:736109545492:web:6c7e1606ff708f3423ff01',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export {db, auth};
