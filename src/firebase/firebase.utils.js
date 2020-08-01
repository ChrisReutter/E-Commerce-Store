import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDcol-rVx_4UmWStNPo1oJTbhY6Q8COpaw",
  authDomain: "crwn-ecommerce-tut.firebaseapp.com",
  databaseURL: "https://crwn-ecommerce-tut.firebaseio.com",
  projectId: "crwn-ecommerce-tut",
  storageBucket: "crwn-ecommerce-tut.appspot.com",
  messagingSenderId: "448510564845",
  appId: "1:448510564845:web:69d901fb77de791f2bafe4",
  measurementId: "G-ZF94L023WB",
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const {
      displayName,
      email
    } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;