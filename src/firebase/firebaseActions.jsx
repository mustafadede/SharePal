import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database, storage } from "./firebaseConfig";
import { toast } from "react-toastify";
import { child, get, getDatabase, orderByValue, push, query, ref, set, update } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";

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
        quote: "",
        topOne: "",
        instagram: "",
        linkedin: "",
        github: "",
        currentlyWatching: "",
        bestMovieYear: "",
        bestSeriesYear: "",
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
    return false;
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
        instagram: snapshot.val().instagram || "",
        linkedin: snapshot.val().linkedin || "",
        github: snapshot.val().github || "",
        banner: snapshot.val().banner,
        currentlyWatching: snapshot.val().currentlyWatching || "",
        bestMovieYear: snapshot.val().bestMovieYear || "",
        bestSeriesYear: snapshot.val().bestSeriesYear || "",
        photoURL: getAuth().currentUser.photoURL || snapshot.val().photoURL || "",
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

const getProfilePhoto = async (uid) => {
  try {
    const photoRef = sRef(storage, `profilePhotos/${uid}`);
    const photoUrl = await getDownloadURL(photoRef);
    return photoUrl;
  } catch (error) {
    return null;
  }
};

const getUserByTheUsername = async (username) => {
  try {
    const snapshot = await get(child(dbRef, `users`));
    if (snapshot.exists()) {
      const user = [];
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().displayName === username) {
          user.push({
            uid: childSnapshot.key,
            nick: childSnapshot.val().displayName,
            following: childSnapshot.val().following,
            followers: childSnapshot.val().followers,
            email: childSnapshot.val().email,
            quote: childSnapshot.val().quote,
            topOne: childSnapshot.val().topOne,
            instagram: childSnapshot.val().instagram,
            linkedin: childSnapshot.val().linkedin,
            github: childSnapshot.val().github,
            banner: childSnapshot.val().banner,
            currentlyWatching: childSnapshot.val().currentlyWatching || "",
            bestMovieYear: childSnapshot.val().bestMovieYear || "",
            bestSeriesYear: childSnapshot.val().bestSeriesYear || "",
          });
        }
      });
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

const getUserByTheIds = async (userId) => {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      const user = {
        uid: snapshot.key,
        nick: snapshot.val().displayName,
        banner: snapshot.val().banner,
      };
      return user;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    return null;
  }
};

const getFollowersForUser = async (userId) => {
  try {
    const snapshot = await get(child(dbRef, `followers/${userId}`));
    if (snapshot.exists()) {
      const followers = [];
      snapshot.forEach((childSnapshot) => {
        followers.push({
          uid: childSnapshot.val().uid,
          date: childSnapshot.val().date,
        });
      });
      return followers;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserBySearch = async (username) => {
  try {
    username = username.toLowerCase();
    const snapshot = await get(child(dbRef, `users`));
    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().displayName.toLowerCase().includes(username)) {
          users.push({
            uid: childSnapshot.key,
            displayName: childSnapshot.val().displayName,
            following: childSnapshot.val().following,
            followers: childSnapshot.val().followers,
            email: childSnapshot.val().email,
            quote: childSnapshot.val().quote,
            topOne: childSnapshot.val().topOne,
            instagram: childSnapshot.val().instagram,
            linkedin: childSnapshot.val().linkedin,
            github: childSnapshot.val().github,
            banner: childSnapshot.val().banner,
            currentlyWatching: childSnapshot.val().currentlyWatching || "",
            bestMovieYear: childSnapshot.val().bestMovieYear || "",
            bestSeriesYear: childSnapshot.val().bestSeriesYear || "",
          });
        }
      });
      return users;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUsers = async () => {
  try {
    const userId = localStorage.getItem("user");
    const snapshot = await get(child(dbRef, `users`));
    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key !== userId) {
          users.push({
            uid: childSnapshot.key,
            displayName: childSnapshot.val().displayName,
            following: childSnapshot.val().following,
            followers: childSnapshot.val().followers,
            email: childSnapshot.val().email,
            quote: childSnapshot.val().quote,
            topOne: childSnapshot.val().topOne,
            instagram: childSnapshot.val().instagram,
            linkedin: childSnapshot.val().linkedin,
            github: childSnapshot.val().github,
            banner: childSnapshot.val().banner,
            currentlyWatching: childSnapshot.val().currentlyWatching || "",
            bestMovieYear: childSnapshot.val().bestMovieYear || "",
            bestSeriesYear: childSnapshot.val().bestSeriesYear || "",
          });
        }
      });
      return users;
    } else {
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
    const postsRef = ref(database, `posts/${userId}`);
    const snapshotPosts = await get(postsRef);
    if (snapshot.exists()) {
      await set(ref(database, `users/${userId}`), {
        displayName: data.nick || snapshot.val().displayName,
        email: data.email || snapshot.val().email,
        following: data.following || snapshot.val().following,
        followers: data.followers || snapshot.val().followers,
        banner: data.banner || snapshot.val().banner,
        quote: data.quote || snapshot.val().quote,
        topOne: data.topOne || snapshot.val().topOne,
        instagram: data.instagram || snapshot.val().instagram || "",
        linkedin: data.linkedin || snapshot.val().linkedin || "",
        github: data.github || snapshot.val().github || "",
        currentlyWatching: data.currentlyWatching || snapshot.val().currentlyWatching || "",
        bestMovieYear: data.bestMovieYear || snapshot.val().bestMovieYear || "",
        bestSeriesYear: data.bestSeriesYear || snapshot.val().bestSeriesYear || "",
        photoURL: getAuth().currentUser.photoURL || snapshot.val().photoURL || null,
      });
      if (snapshotPosts.exists()) {
        snapshotPosts.forEach((childSnapshot) => {
          update(ref(database, `posts/${userId}/${childSnapshot.key}`), {
            ...childSnapshot.val(),
            nick: data.nick || snapshot.val().displayName,
          });
        });
      }
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

const followUser = async (userId, data) => {
  try {
    const followingSnapshot = push(ref(database, `following/${userId}`));
    const followersSnapshot = push(ref(database, `followers/${data.uid}`));
    set(followingSnapshot, {
      uid: data.uid,
      date: Date.now(),
    });
    set(followersSnapshot, {
      uid: userId,
      date: Date.now(),
    });
    return true;
  } catch (error) {
    console.error(error);
  }
};

const getSelectedUserFollowing = async (userId) => {
  const followingRef = ref(database, `following/${userId}`);
  const snapshot = await get(followingRef);
  const selectedUserFollowing = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserFollowing.push({
        uid: childSnapshot.val().uid,
        date: childSnapshot.val().date,
      });
    });
  }
  return selectedUserFollowing;
};

const unfollowUser = async (userId, data) => {
  try {
    const followingSnapshot = ref(database, `following/${userId}`);
    const followersSnapshot = ref(database, `followers/${data.uid}`);
    const followingSnapshotData = await get(followingSnapshot);
    const followersSnapshotData = await get(followersSnapshot);
    followersSnapshotData.forEach((childSnapshot) => {
      if (childSnapshot.val().uid === userId) {
        console.log("hello");
        set(ref(database, `followers/${data.uid}/${childSnapshot.key}`), null);
      }
    });
    followingSnapshotData.forEach((childSnapshot) => {
      if (childSnapshot.val().uid === data.uid) {
        console.log("hello");
        set(ref(database, `following/${userId}/${childSnapshot.key}`), null);
      }
    });
    return true;
  } catch (error) {
    console.error(error);
  }
};

const createPostAction = async (text, attachedFilm, spoiler, nick) => {
  try {
    const userId = getAuth().currentUser.uid;
    const newPostRef = push(ref(database, `posts/${userId}`));
    set(newPostRef, {
      userId: userId,
      photoURL: getAuth().currentUser.photoURL || null,
      nick: nick,
      spoiler: spoiler || null,
      attachedFilm: attachedFilm || null,
      content: text,
      likes: 0,
      likesList: [],
      comments: 0,
      edited: false,
      commentsList: [],
      repost: 0,
      repostList: [],
      date: Date.now(),
    });
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const editSelectedPost = async (postId, text) => {
  try {
    const userId = getAuth().currentUser.uid;
    const postsRef = ref(database, `posts/${userId}/`);
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key === postId) {
          const updates = {};
          updates[`posts/${userId}/${childSnapshot.key}`] = {
            ...childSnapshot.val(),
            content: text ? text : childSnapshot.val().content,
            edited: true,
          };
          update(ref(database), updates);
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
          spoiler: value.spoiler,
          attachedFilm: value.attachedFilm,
          likesList: value.likesList || null,
          likes: value.likes,
          comments: value.comments,
          edited: value.edited || false,
          commentsList: value.commentsList || null,
          repost: value.repost,
          repostsList: value.repostsList || null,
          date: value.date,
          userId: value.userId.trim(),
        });
      });
    });
  }
  return allPosts.sort((a, b) => a.date - b.date);
};

const deleteSelectedPost = async (userId, postId) => {
  try {
    const postsRef = ref(database, `posts/${userId}/${postId}`);
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      set(ref(database, `posts/${userId}/${postId}`), null);
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

const updateSelectedPost = async (userId, postId, data) => {
  try {
    const postsRef = ref(database, `posts/${userId}/`);
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key === postId) {
          const updates = {};
          updates[`posts/${userId}/${childSnapshot.key}`] = { ...childSnapshot.val(), ...data };
          update(ref(database), updates);
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

const getAllSelectedUserPostLikeLists = async (userId) => {
  const postsRef = ref(database, `likesList/${userId}`);
  const snapshot = await get(postsRef);
  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      allPosts.push({
        date: childSnapshot.val().date,
        id: childSnapshot.val().id,
        postId: childSnapshot.val().postId,
      });
    });
  }
  return allPosts;
};

const createSelectedUserPostLikeLists = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const postsRef = push(ref(database, `likesList/${userId}/`));
    set(postsRef, ...data);
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const removeSelectedUserPostLikeLists = async (userId, postId) => {
  try {
    const userPost = getAuth().currentUser.uid;
    const postsRef = ref(database, `likesList/${userPost}/`);
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().postId === postId) {
          console.log(childSnapshot.val().postId === postId);
          set(ref(database, `likesList/${userPost}/${childSnapshot.key}`), null);
        }
      });
    }
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAllSelectedUserPostRepostsLists = async (userId) => {
  const postsRef = ref(database, `repostsList/${userId}`);
  const snapshot = await get(postsRef);
  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      allPosts.push({
        date: childSnapshot.val().date,
        id: childSnapshot.val().id,
        postId: childSnapshot.val().postId,
      });
    });
  }
  return allPosts;
};

const createSelectedUserPostRepostsLists = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const postsRef = push(ref(database, `repostsList/${userId}/`));
    set(postsRef, ...data);
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const removeSelectedUserPostRepostsLists = async (userId, postId, data) => {
  try {
    const postsRef = ref(database, `repostsList/${userId}/`);
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === data.id) {
          set(ref(database, `repostsList/${userId}/${childSnapshot.key}`), null);
        }
      });
    }
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getSpecificPost = async (userId, postId) => {
  const postsRef = ref(database, `posts/${userId}/${postId}`);
  const snapshot = await get(postsRef);
  const post = [];
  if (snapshot.exists()) {
    post.push({
      postId: snapshot.key,
      attachedFilm: snapshot.val()?.attachedFilm,
      comments: snapshot.val().comments,
      edited: snapshot.val().edited,
      content: snapshot.val().content,
      date: snapshot.val().date,
      likes: snapshot.val().likes,
      nick: snapshot.val().nick,
      likesList: snapshot.val().likesList,
      photoURL: snapshot.val().photoURL,
      repost: snapshot.val().repost,
      repostsList: snapshot.val().repostsList,
      spoiler: snapshot.val()?.spoiler,
      userId: snapshot.val().userId,
    });
  }
  return post;
};

const getSelectedUserPosts = async (userId) => {
  const selectedUserPosts = ref(database, `posts/${userId}`);
  const snapshot = await get(selectedUserPosts);
  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      allPosts.push({
        postId: childSnapshot.key,
        photoURL: childSnapshot.val().photoURL,
        nick: childSnapshot.val().nick,
        content: childSnapshot.val().content,
        spoiler: childSnapshot.val().spoiler,
        attachedFilm: childSnapshot.val().attachedFilm,
        likes: childSnapshot.val().likes,
        likesList: childSnapshot.val().likesList,
        comments: childSnapshot.val().comments,
        edited: childSnapshot.val().edited,
        commentsList: childSnapshot.val().commentsList,
        repost: childSnapshot.val().repost,
        repostsList: childSnapshot.val().repostsList,
        date: childSnapshot.val().date,
        userId: childSnapshot.val().userId,
      });
    });
  }
  return allPosts;
};

const getSelectedUserPost = async (userId, postId) => {
  const selectedUserPosts = ref(database, `posts/${userId}/${postId}`);
  const snapshot = await get(selectedUserPosts);
  const post = [];
  if (snapshot.exists()) {
    post.push({
      photoURL: snapshot.val().photoURL,
      nick: snapshot.val().nick,
      content: snapshot.val().content,
      spoiler: snapshot.val().spoiler,
      attachedFilm: snapshot.val().attachedFilm,
      likes: snapshot.val().likes,
      comments: snapshot.val().comments,
      edited: snapshot.val().edited,
      repost: snapshot.val().repost,
      date: snapshot.val().date,
      userId: snapshot.val().userId,
    });
  }
  return post;
};

const getNotifications = async (uid) => {
  const notificationsRef = ref(database, `notifications/${uid}`);
  const snapshot = await get(notificationsRef);
  const notifications = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      notifications.push({
        from: childSnapshot.val().from,
        date: childSnapshot.val().date,
        type: childSnapshot.val().type,
      });
    });
  } else {
    return null;
  }
  return notifications;
};

const createNotification = async (uid, data) => {
  try {
    const newNotificationRef = push(ref(database, `notifications/${uid}`));
    set(newNotificationRef, {
      from: {
        uid: data.from.uid,
        nick: data.from.nick,
        photo: data.from.photo,
        postId: data.from?.postId || null,
      },
      date: data.date,
      type: data.type,
    });
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const deleteUserNotification = async (uid) => {
  try {
    set(ref(database, `notifications/${uid}`), null);
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
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

const updatePinnedList = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const pinnedListRef = ref(database, `pinnedList/${userId}`);
    const snapshot = await get(pinnedListRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === data.id) {
          const newChildRef = push(ref(database, `pinnedList/${userId}/${childSnapshot.key}/list`));
          set(newChildRef, {
            id: data?.id,
            title: data?.title,
            poster: data?.poster,
            releaseDate: data?.releaseDate,
            backdrop: data?.backdrop,
          });
        }
      });
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const removePinnedList = async (id) => {
  try {
    const userId = getAuth().currentUser.uid;
    const pinnedListRef = ref(database, `pinnedList/${userId}`);
    const snapshot = await get(pinnedListRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === id) {
          set(ref(database, `pinnedList/${userId}/${childSnapshot.key}`), null);
        }
      });
      return true;
    } else {
      return null;
    }
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
        list: childSnapshot.val().list,
      });
    });
  }
  return selectedUserLists;
};

const getSelectedUserSelectedList = async (userId, listId) => {
  const pinnedListsRef = ref(database, `pinnedList/${userId}/${listId}`);
  const snapshot = await get(pinnedListsRef);
  const selectedUserLists = [];
  if (snapshot.exists()) {
    selectedUserLists.push({
      id: snapshot.val().id,
      title: snapshot.val().title,
      isPinned: snapshot.val().isPinned,
      date: snapshot.val().date,
      list: snapshot.val().list,
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
          const updates = {};
          updates[`pinnedList/${userId}/${childSnapshot.key}`] = { ...childSnapshot.val(), ...data };
          update(ref(database), updates);
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

const deleteSelectedUserListsItem = async (userId, itemId) => {
  try {
    const pinnedListsRef = ref(database, `pinnedList/${userId}`);
    const snapshot = await get(pinnedListsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().list[itemId]) {
          set(ref(database, `pinnedList/${userId}/${childSnapshot.key}/list/${itemId}`), null);
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
    const postsRef = ref(database, `posts/${userId}`);
    const snapshot = await get(postsRef);
    const storageRef = sRef(storage, `profilePhotos/${userId}`);
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((url) => {
        updateProfile(auth.currentUser, { photoURL: url });
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.key);
            update(ref(database, `posts/${userId}/${childSnapshot.key}`), {
              ...childSnapshot.val(),
              photoURL: url,
            });
          });
        }
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

const updateWantToWatch = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const newWantToWatchRef = push(ref(database, `wanttowatch/${userId}`));
    set(newWantToWatchRef, data);
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const deleteWantToWatch = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const newWantToWatchRef = ref(database, `wanttowatch/${userId}`);
    const snapshot = await get(newWantToWatchRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === data.id) {
          set(ref(database, `wanttowatch/${userId}/${childSnapshot.key}`), null);
        }
      });
    }
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const updateWatched = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const newWatchedRef = push(ref(database, `watched/${userId}`));
    set(newWatchedRef, data);
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const deleteWatched = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const WatchedRef = ref(database, `watched/${userId}`);
    const snapshot = await get(WatchedRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === data.id) {
          set(ref(database, `watched/${userId}/${childSnapshot.key}`), null);
        }
      });
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

const createUnfinished = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const newWatchedRef = push(ref(database, `unfinished/${userId}`));
    set(newWatchedRef, data);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteUnfinished = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const WatchedRef = ref(database, `unfinished/${userId}`);
    const snapshot = await get(WatchedRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === data.id) {
          set(ref(database, `unfinished/${userId}/${childSnapshot.key}`), null);
        }
      });
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

const getSelectedUserWantToWatch = async (userId) => {
  const wantToWatchRef = ref(database, `wanttowatch/${userId}`);
  const snapshot = await get(wantToWatchRef);
  const selectedUserWantToWatch = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserWantToWatch.push({
        id: childSnapshot.val().id,
        mediaType: childSnapshot.val().mediaType,
        name: childSnapshot.val().name,
        photoURL: childSnapshot.val().photoURL,
      });
    });
  }
  return selectedUserWantToWatch;
};

const getSelectedUserWatched = async (userId) => {
  const watchedRef = ref(database, `watched/${userId}`);
  const snapshot = await get(watchedRef);
  const selectedUserWatched = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserWatched.push({
        id: childSnapshot.val().id,
        mediaType: childSnapshot.val().mediaType,
        name: childSnapshot.val().name,
        photoURL: childSnapshot.val().photoURL,
      });
    });
  }
  return selectedUserWatched;
};

const getSelectedUserUnfinished = async (userId) => {
  const unfinishedRef = ref(database, `unfinished/${userId}`);
  const snapshot = await get(unfinishedRef);
  const selectedUserUnfinished = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserUnfinished.push({
        id: childSnapshot.val().id,
        mediaType: childSnapshot.val().mediaType,
        name: childSnapshot.val().name,
        photoURL: childSnapshot.val().photoURL,
      });
    });
  }
  return selectedUserUnfinished;
};

export {
  createUserWithEmailAction,
  signInWithEmailAction,
  getCurrentUserData,
  getProfilePhoto,
  getUserByTheUsername,
  getUserByTheIds,
  getFollowersForUser,
  getUserBySearch,
  getUsers,
  updateCurrentUserData,
  followUser,
  getSelectedUserFollowing,
  unfollowUser,
  createPostAction,
  editSelectedPost,
  getAllPosts,
  deleteSelectedPost,
  updateSelectedPost,
  getSpecificPost,
  getSelectedUserPosts,
  getSelectedUserPost,
  getNotifications,
  createNotification,
  deleteUserNotification,
  createPinnedList,
  updatePinnedList,
  removePinnedList,
  getSelectedUserLists,
  getSelectedUserSelectedList,
  updateSelectedUserLists,
  getAllSelectedUserPostLikeLists,
  createSelectedUserPostLikeLists,
  removeSelectedUserPostLikeLists,
  getAllSelectedUserPostRepostsLists,
  createSelectedUserPostRepostsLists,
  removeSelectedUserPostRepostsLists,
  deleteSelectedUserListsItem,
  uploadProfilePhoto,
  uploadBannerPhoto,
  updateWantToWatch,
  deleteWantToWatch,
  updateWatched,
  deleteWatched,
  createUnfinished,
  deleteUnfinished,
  getSelectedUserWantToWatch,
  getSelectedUserWatched,
  getSelectedUserUnfinished,
};
