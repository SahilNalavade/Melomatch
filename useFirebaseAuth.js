// useFirebaseAuth.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase';

const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      setError(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error);
    }
  };

  const signUpWithEmailAndPassword = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const authUser = userCredential.user;

      // Update the user profile with the provided username
      await updateProfile(authUser, { displayName: username });
    } catch (error) {
      setError(error);
    }
  };

  const signOutUser = () => {
    signOut(auth);
  };

  return {
    user,
    loading,
    error,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signOut: signOutUser,
  };
};

export default useFirebaseAuth;
