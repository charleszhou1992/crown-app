import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDvNPEBg8v148l3b52UxLq4rgcU-9AG6zM",
  authDomain: "item-db-45a17.firebaseapp.com",
  databaseURL: "https://item-db-45a17.firebaseio.com",
  projectId: "item-db-45a17",
  storageBucket: "item-db-45a17.appspot.com",
  messagingSenderId: "742147396032",
  appId: "1:742147396032:web:bd948e5c4319570760f825",
  measurementId: "G-9QN8WFD0S6",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
