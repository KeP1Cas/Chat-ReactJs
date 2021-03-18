import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyD2L5W2w5i1zIMNKDHAfwZyD9GQp5M_3NY",
  authDomain: "realtime-chat-871ec.firebaseapp.com",
  projectId: "realtime-chat-871ec",
  storageBucket: "realtime-chat-871ec.appspot.com",
  messagingSenderId: "706761118153",
  appId: "1:706761118153:web:e5a1a89198f7dbb2599818"
})

export const Context = createContext(null)
const auth = firebase.auth()
const firestore = firebase.firestore()

ReactDOM.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

