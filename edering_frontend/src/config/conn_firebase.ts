import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import envData from './envData';

const app = firebase.initializeApp(envData.firebase);
// if (!firebase.app.length) {
// } else {
//   firebase.app();
// }

export const auth = getAuth(app);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
export const storage = firebase.storage()
