import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, database, storage } from "./firebaseConfig";
import { toast } from "react-toastify";
import { child, get, getDatabase, push, ref, set } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";

const dbRef = ref(getDatabase());

setPersistence(auth, browserSessionPersistence);

const createUserWithEmailAction = async (data) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
    if (user) {
      set(ref(database, `users/${user.user.uid}`), {
        displayName: data.name,
        following: 0,
        followers: 0,
        email: data.email,
        quote: "",
        topOne: "",
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
      return toast("This email is already in use");
    }
    if (errorCode === "auth/wrong-password") {
      return toast("Password is wrong!");
    }
    if (errorCode === "auth/invalid-email") {
      return toast("Email is wrong!");
    }
  }
};

const signInWithEmailAction = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    const errorCode = error.code;
    if (error.code === "auth/user-not-found") {
      toast("User not found!");
    }
    if (errorCode === "auth/wrong-password") {
      return toast("Password is wrong!");
    }
    if (errorCode === "auth/invalid-email") {
      return toast("Email is wrong!");
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
        quote: snapshot.val().quote,
        topOne: snapshot.val().topOne,
        banner: snapshot.val().banner,
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

const updateCurrentUserData = async (userId, data) => {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      await set(ref(database, `users/${userId}`), {
        displayName: data.nick || snapshot.val().displayName,
        email: data.email || snapshot.val().email,
        following: snapshot.val().following,
        followers: snapshot.val().followers,
        banner: data.banner || "",
        quote: data.quote || snapshot.val().quote,
        topOne: data.topOne || snapshot.val().topOne,
      });
      return true;
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
      attachedPhoto: attachedPhoto || null,
      attachedFilm: attachedFilm || null,
      content: text,
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
          attachedPhoto: value.attachedPhoto,
          attachedFilm: value.attachedFilm,
          likes: value.likes,
          comments: value.comments,
          date: value.date,
        });
      });
    });
  }
  return allPosts;
};

const createPinnedList = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const newPinnedListRef = push(ref(database, `pinnedList/${userId}`));
    set(newPinnedListRef, data);
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const uploadProfilePhoto = async (file) => {
  try {
    const userId = getAuth().currentUser.uid;
    const storageRef = sRef(storage, `profilePhotos/${userId}`);
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((url) => {
        updateProfile(auth.currentUser, { photoURL: url });
        return toast("Uploaded successfully!");
      });
    });
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const uploadBannerPhoto = async (file) => {
  try {
    const userId = getAuth().currentUser.uid;
    const storageRef = sRef(storage, `bannerPhotos/${userId}`);
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((url) => {
        updateCurrentUserData(localStorage.getItem("user"), { banner: url }).then(() => {
          return toast("Uploaded successfully!");
        });
      });
    });
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

export {
  createUserWithEmailAction,
  signInWithEmailAction,
  getCurrentUserData,
  updateCurrentUserData,
  createPostAction,
  getAllPosts,
  createPinnedList,
  uploadProfilePhoto,
  uploadBannerPhoto,
};
