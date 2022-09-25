const envData = {
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY?.trim(),
    authDomain: 'edering-authentication.firebaseapp.com'.trim(),
    projectId: process.env.FIREBASE_PROJECT_ID?.trim(),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET?.trim(),
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID?.trim(),
    appId: process.env.FIREBASE_APP_ID?.trim(),
    measurementId: process.env.FIREBASE_MEASUREMENT_ID?.trim(),
  },
  baseURL: process.env.BASE_URL,
};

export default envData;
