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
});


export const auth = app.auth()
export default app