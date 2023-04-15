import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyB7WbedVpMk1dBnjpttkPn1vi-cid1Z9rg",
  authDomain: "serph-f9c7e.firebaseapp.com",
  databaseURL: "https://serph-f9c7e-default-rtdb.firebaseio.com",
  projectId: "serph-f9c7e",
  storageBucket: "serph-f9c7e.appspot.com",
  messagingSenderId: "937690296061",
  appId: "1:937690296061:web:84f9a2adda111ed8481894",
  measurementId: "G-TMSG2HY8GE"
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // databaseURL: import.meta.env.VITE_DATABASE_URL,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  // appId: import.meta.env.VITE_APP_ID,
  // measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});


export const auth = app.auth()
export default app