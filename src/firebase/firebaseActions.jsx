import { getAuth, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebaseConfig";
import { toast } from "react-toastify";
const auth = getAuth(app);

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
    await setPersistence(auth, browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
    return toast("Giriş işlemi başarılı!");
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

export { createUserWithEmailAction, signInWithEmailAction };
