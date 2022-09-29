<<<<<<< HEAD
export const envData = {
  // firebase: {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.FIREBASE_APP_ID,
  //   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  // },

  firebase: {
    apiKey: 'AIzaSyAaN6dcaK4PTHM78BM_50qpPSnuhjP2wH4',
    authDomain: 'eordering-6bc66.firebaseapp.com',
    projectId: 'eordering-6bc66',
    storageBucket: 'eordering-6bc66.appspot.com',
    messagingSenderId: '671647283683',
    appId: '1:671647283683:web:2315f8c9c32820a10488d6',
    measurementId: 'G-NHRMJTNBH3',
=======
const envData = {
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY?.trim(),
    authDomain: 'edering-authentication.firebaseapp.com'.trim(),
    projectId: process.env.FIREBASE_PROJECT_ID?.trim(),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET?.trim(),
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID?.trim(),
    appId: process.env.FIREBASE_APP_ID?.trim(),
    measurementId: process.env.FIREBASE_MEASUREMENT_ID?.trim(),
>>>>>>> origin
  },
  baseURL: process.env.BASE_URL,
};

export default envData;
