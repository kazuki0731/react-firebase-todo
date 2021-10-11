import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "@firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLogin(true);
    });

    return () => {
      unsubscribed();
    };
  }, []);

  const signup = async (email, password, history) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const signin = async (email, password, history) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const signout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, signin, signout }}>
      {login && children}
    </AuthContext.Provider>
  );
};
