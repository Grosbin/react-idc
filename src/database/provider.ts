import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth as FirebaseAuth, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

interface User {
  email: string;
  password: string;
  displayName?: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}: User) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    // await updateProfile( FirebaseAuth, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error: any) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async ({
  email,
  password,
}: LoginUser) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error: any) {
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(FirebaseAuth, email);
  } catch (error: any) {
    console.log(error);
  }
};

export const addUserAdmin = async (email: string) => {
  try {
    await addDoc(collection(db, "admin"), { email });
  } catch (error) {
    console.log(error);
  }
};
