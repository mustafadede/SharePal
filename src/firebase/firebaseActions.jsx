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
import { child, get, getDatabase, orderByValue, push, query, ref, set } from "firebase/database";
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
        currentlyWatching: "",
        banner: "",
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
        currentlyWatching: snapshot.val().currentlyWatching || "",
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
        banner: data.banner || snapshot.val().banner,
        quote: data.quote || snapshot.val().quote,
        topOne: data.topOne || snapshot.val().topOne,
        currentlyWatching: data.currentlyWatching || snapshot.val().currentlyWatching,
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

const createPostAction = async (text, attachedFilm, attachedPhoto, nick) => {
  try {
    const userId = getAuth().currentUser.uid;
    const newPostRef = push(ref(database, `posts/${userId}`));
    set(newPostRef, {
      photoURL: getAuth().currentUser.photoURL || null,
      nick: nick,
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
  const sortedPostsRef = query(postsRef, orderByValue());
  const snapshot = await get(sortedPostsRef);

  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const posts = childSnapshot.val();
      Object.entries(posts).forEach(([key, value]) => {
        allPosts.push({
          photoURL: value.photoURL || null,
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
  return allPosts.sort((a, b) => a.date - b.date);
};

const getSelectedUserPosts = async (userId) => {
  const selectedUserPosts = ref(database, `posts/${userId}`);
  const snapshot = await get(selectedUserPosts);
  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      allPosts.push({
        photoURL: getAuth().currentUser.photoURL,
        nick: childSnapshot.val().nick,
        content: childSnapshot.val().content,
        attachedPhoto: childSnapshot.val().attachedPhoto,
        attachedFilm: childSnapshot.val().attachedFilm,
        likes: childSnapshot.val().likes,
        comments: childSnapshot.val().comments,
        repost: childSnapshot.val().repost,
        date: childSnapshot.val().date,
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

const getSelectedUserLists = async (userId) => {
  const pinnedListsRef = ref(database, `pinnedList/${userId}`);
  const snapshot = await get(pinnedListsRef);
  const selectedUserLists = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserLists.push({
        id: childSnapshot.val().id,
        title: childSnapshot.val().title,
        isPinned: childSnapshot.val().isPinned,
        date: childSnapshot.val().date,
        list: childSnapshot.val().list || [],
      });
    });
  }
  return selectedUserLists;
};

const updateSelectedUserLists = async (userId, data) => {
  try {
    const pinnedListsRef = ref(database, `pinnedList/${userId}`);
    const snapshot = await get(pinnedListsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === data.id) {
          const listToUpdateRef = child(pinnedListsRef, childSnapshot.key);
          update(listToUpdateRef, {
            isPinned: data.isPinned || childSnapshot.val().isPinned,
            list: data.list || childSnapshot.val().list,
            title: data.title || childSnapshot.val().title,
          });
        }
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

const uploadProfilePhoto = async (file) => {
  try {
    const userId = getAuth().currentUser.uid;
    const storageRef = sRef(storage, `profilePhotos/${userId}`);
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((url) => {
        updateProfile(auth.currentUser, { photoURL: url });
        return toast.success("Uploaded successfully!");
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
  getSelectedUserPosts,
  createPinnedList,
  getSelectedUserLists,
  updateSelectedUserLists,
  uploadProfilePhoto,
  uploadBannerPhoto,
};
