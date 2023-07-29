import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import { toast } from "react-toastify";
import { child, get, getDatabase, ref, set } from "firebase/database";

const dbRef = ref(getDatabase());

const createUserWithEmailAction = async (data) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
    if (user) {
      set(ref(database, `users/${user.user.uid}`), {
        displayName: data.name,
        following: 0,
        followers: 0,
      });
      return true;
    }
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

const getCurrentUserData = async (userId) => {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      const user = {
        nick: snapshot.val().displayName,
        following: snapshot.val().following,
        followers: snapshot.val().followers,
      };
      return user;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
export { createUserWithEmailAction, signInWithEmailAction, getCurrentUserData };
