import { createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { app, auth } from "./firebaseConfig";
import { toast } from "react-toastify";

const createUserWithEmailAction = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "auth/email-already-in-use") {
      return toast("Bu email zaten kullanılıyor!");
    }
    if (errorCode === "auth/wrong-password") {
      return toast("Şifre hatalı!");
    }
    if (errorCode === "auth/invalid-email") {
      return toast("Email hatalı!");
    }
  }
};

const signInWithEmailAction = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    const errorCode = error.code;
    if (error.code === "auth/user-not-found") {
      toast("Böyle bir kullanıcı yok!");
    }
    if (errorCode === "auth/wrong-password") {
      return toast("Şifre hatalı!");
    }
    if (errorCode === "auth/invalid-email") {
      return toast("Email hatalı!");
    }
  }
};

const signOutAction = signOut(auth)
  .then(() => {
    return true;
  })
  .catch((error) => {
    return false;
  });

export { createUserWithEmailAction, signInWithEmailAction, signOutAction };
