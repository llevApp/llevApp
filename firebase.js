import { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const app = firebase.initializeApp( {
  apiKey: "AIzaSyAEKqtJyQ4E9l77kaTNGnRbyDdfzJvVWHw",
  authDomain: "sistema-electivos-auth.firebaseapp.com",
  projectId: "sistema-electivos-auth",
  storageBucket: "sistema-electivos-auth.appspot.com",
  messagingSenderId: "41892760780",
  appId: "1:41892760780:web:d3e9711d5d83e2f3a20669"
});

// Initialize Firebase
export const auth = firebase.auth();
export const storage = getStorage(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  
  return currentUser;
}

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, `images/avatars/${currentUser.uid}` + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}

export default app;