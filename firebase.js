import { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const app = firebase.initializeApp( {
  apiKey: "AIzaSyAsMZa1qIKM3jalkzxNqUyvXQ1CNeS7fEs",
  authDomain: "llevapp.firebaseapp.com",
  projectId: "llevapp",
  storageBucket: "llevapp.appspot.com",
  messagingSenderId: "534135888579",
  appId: "1:534135888579:web:7322bfd5e0a7be0961a076",
  measurementId: "G-6R8LMHDCTH"
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