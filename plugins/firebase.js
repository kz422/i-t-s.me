import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

if (!firebase.apps.length) {
const config = {
  apiKey: "AIzaSyBJ4R3W02fI3TCS1KX7ZS4vkixyZzuxZYY",
  authDomain: "i-t-s.me",
  projectId: "profs-941da",
  storageBucket: "profs-941da.appspot.com",
  messagingSenderId: "316853695129",
  appId: "1:316853695129:web:eafece8c7e331c2b54fe08"
}
  firebase.initializeApp(config);
}

const db = firebase.firestore()
export {
  firebase,
  db
}
