import firebase from 'firebase/compat/app';
import { envData } from '../config/envData';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


firebase.initializeApp(envData.firebase);
// if (!firebase.app.length) {
// } else {
//   firebase.app();
// }

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();