import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import { toast } from "react-toastify";
import { child, get, getDatabase, push, ref, set } from "firebase/database";

const dbRef = ref(getDatabase());

const createUserWithEmailAction = async (data) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
    if (user) {
      set(ref(database, `users/${user.user.uid}`), {
        displayName: data.name,
        following: 0,
        followers: 0,
        email: data.email,
      });
      updateProfile(auth.currentUser, {
        displayName: data.name,
        email: data.email,
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
    await setPersistence(auth, browserSessionPersistence);
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
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
        email: snapshot.val().email,
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

const createPostAction = async (text, attachedFilm, attachedPhoto) => {
  try {
    const userId = getAuth().currentUser.uid;
    const newPostRef = push(ref(database, `posts/${userId}`));
    set(newPostRef, {
      nick: getAuth().currentUser.displayName,
      content: text,
      attachedPhoto: attachedPhoto || null,
      attachedFilm: attachedFilm || null,
      likes: 0,
      comments: 0,
      repost: 0,
      date: Date.now(),
    });
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const getAllPosts = async () => {
  const postsRef = ref(database, "posts");
  const snapshot = await get(postsRef);
  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const posts = childSnapshot.val();
      Object.entries(posts).forEach(([key, value]) => {
        allPosts.push({
          postId: key,
          nick: value.nick,
          content: value.content,
          attachedPhoto: value.content.attachedPhoto,
          attachedFilm: value.content.attachedFilm,
          likes: value.likes,
          comments: value.comments,
          date: value.date,
        });
      });
    });
  }
  return allPosts;
};
export { createUserWithEmailAction, signInWithEmailAction, getCurrentUserData, createPostAction, getAllPosts };
