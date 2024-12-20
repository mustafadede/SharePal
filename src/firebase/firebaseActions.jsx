import { createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database, storage } from "./firebaseConfig";
import { toast } from "react-toastify";
import { child, endBefore, equalTo, get, getDatabase, limitToLast, orderByChild, push, query, ref, set, update } from "firebase/database";
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
        online: false,
        splash: false,
        accountPrivate: "Public",
        taggingPrivacy: "Public",
        listPrivacy: "Public",
      });
      updateProfile(auth.currentUser, {
        displayName: data.name,
        email: data.email,
      });
      return true;
    }
  } catch (error) {
    return error.code;
  }
};

function createNickForUser(nick) {
  const nickRef = push(ref(database, `usernicks/`));
  set(nickRef, nick);
  return true;
}

async function isNickUnique(nick) {
  const nickRef = ref(database, `usernicks/`);
  return get(nickRef).then((snapshot) => {
    if (snapshot.exists()) {
      const nicks = [];
      snapshot.forEach((childSnapshot) => {
        nicks.push(childSnapshot.val());
      });
      return !nicks.includes(nick);
    }
  });
}

const signInWithEmailAction = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    return error.code;
  }
};

const getCurrentUserData = async (userId) => {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      const user = {
        uid: snapshot.key,
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
        online: snapshot.val().online,
        splash: snapshot.val().splash,
        accountPrivate: snapshot.val().accountPrivate || "Public",
        taggingPrivacy: snapshot.val().taggingPrivacy || "Public",
        listPrivacy: snapshot.val().listPrivacy || "Public",
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

const setOnlineStatus = async (userId, status) => {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      await set(ref(database, `users/${userId}`), {
        ...snapshot.val(),
        online: status,
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

const getUserOnlineStatus = async (userId) => {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      const user = {
        online: snapshot.val().online,
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
            online: childSnapshot.val().online || false,
            accountPrivate: childSnapshot.val().accountPrivate || "Public",
            taggingPrivacy: childSnapshot.val().taggingPrivacy || "Public",
            listPrivacy: childSnapshot.val().listPrivacy || "Public",
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
        online: snapshot.val().online || false,
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
            online: childSnapshot.val().online || false,
            accountPrivate: childSnapshot.val().accountPrivate || "Public",
            taggingPrivacy: childSnapshot.val().taggingPrivacy || "Public",
            listPrivacy: childSnapshot.val().listPrivacy || "Public",
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
            online: childSnapshot.val().online || false,
            accountPrivate: childSnapshot.val().accountPrivate || "Public",
            taggingPrivacy: childSnapshot.val().taggingPrivacy || "Public",
            listPrivacy: childSnapshot.val().listPrivacy || "Public",
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
        quote: data.quote || snapshot.val().quote,
        topOne: data.topOne || snapshot.val().topOne,
        banner: data.banner || snapshot.val().banner,
        instagram: data.instagram || snapshot.val().instagram || "",
        linkedin: data.linkedin || snapshot.val().linkedin || "",
        github: data.github || snapshot.val().github || "",
        currentlyWatching: data.currentlyWatching || snapshot.val().currentlyWatching || "",
        bestMovieYear: data.bestMovieYear || snapshot.val().bestMovieYear || "",
        bestSeriesYear: data.bestSeriesYear || snapshot.val().bestSeriesYear || "",
        photoURL: getAuth().currentUser.photoURL || snapshot.val().photoURL || null,
        online: data.online || snapshot.val().online || false,
        deleted: data.deleted || snapshot.val().deleted || false,
        splash: data.splash || snapshot.val().splash || false,
        accountPrivate: data.accountPrivate || snapshot.val().accountPrivate || "Public",
        taggingPrivacy: data.taggingPrivacy || snapshot.val().taggingPrivacy || "Public",
        listPrivacy: data.listPrivacy || snapshot.val().listPrivacy || "Public",
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
        set(ref(database, `followers/${data.uid}/${childSnapshot.key}`), null);
      }
    });
    followingSnapshotData.forEach((childSnapshot) => {
      if (childSnapshot.val().uid === data.uid) {
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
    const newPostRef = push(ref(database, `posts/`));
    const newUserPostRef = push(ref(database, `userPostsList/${userId}/posts/`));
    set(newPostRef, {
      userId: userId,
      postId: newPostRef.key,
      photoURL: getAuth().currentUser.photoURL || null,
      nick: nick,
      spoiler: spoiler || null,
      attachedFilm: attachedFilm || null,
      attachedFilmId: attachedFilm.id || null,
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
    await update(newUserPostRef, {
      [newPostRef.ref.key]: newPostRef.key,
    });
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const createFeedAction = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const newPostRef = push(ref(database, `posts/`));
    set(newPostRef, {
      postId: newPostRef.key,
      userId: userId,
      photoURL: getAuth().currentUser.photoURL || null,
      nick: data.nick,
      attachedAction: data.attachedAction || null,
      actionName: data.actionName || null,
      date: Date.now(),
    });
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const editSelectedPost = async (postId, text, spoiler) => {
  try {
    const postRef = ref(database, `posts/${postId}`);
    const snapshot = await get(postRef);
    if (snapshot.exists()) {
      const postData = snapshot.val();
      const updates = {
        content: text ? text : postData.content,
        edited: true,
        spoiler: spoiler,
      };
      await update(postRef, updates);
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

const getInitialPosts = async () => {
  const postsRef = ref(database, "posts");
  const sortedPostsRef = query(postsRef, orderByChild("date"), limitToLast(15));
  const snapshot = await get(sortedPostsRef);
  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const posts = childSnapshot.val();
      const postId = childSnapshot.key;
      allPosts.push({
        photoURL: posts.photoURL || null,
        postId: postId,
        nick: posts.nick,
        content: posts.content,
        spoiler: posts.spoiler,
        attachedFilm: posts.attachedFilm,
        likesList: posts.likesList || null,
        likes: posts.likes,
        comments: posts.comments,
        edited: posts.edited || false,
        repost: posts.repost,
        repostsList: posts.repostsList || null,
        date: posts.date,
        userId: posts.userId.trim(),
        attachedAction: posts.attachedAction || null,
        actionName: posts.actionName || null,
      });
    });
  }
  return allPosts.reverse();
};

const getAllPosts = async () => {
  const postsRef = ref(database, "posts");
  const sortedPostsRef = query(postsRef, orderByChild("date"));

  const snapshot = await get(sortedPostsRef);

  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const posts = childSnapshot.val();
      const postId = childSnapshot.key;
      allPosts.push({
        photoURL: posts.photoURL || null,
        postId: postId,
        nick: posts.nick,
        content: posts.content,
        spoiler: posts.spoiler,
        attachedFilm: posts.attachedFilm,
        likesList: posts.likesList || null,
        likes: posts.likes,
        comments: posts.comments,
        edited: posts.edited || false,
        repost: posts.repost,
        repostsList: posts.repostsList || null,
        date: posts.date,
        userId: posts.userId.trim(),
        attachedAction: posts.attachedAction || null,
        actionName: posts.actionName || null,
      });
    });
  }
  return allPosts;
};

const getPreviousPosts = async (lastPostDate) => {
  const postsRef = ref(database, "posts");
  // lastPostDate'den önceki verileri getirmek için endBefore kullanıyoruz.
  const sortedPostsRef = query(
    postsRef,
    orderByChild("date"),
    endBefore(lastPostDate), // Bu, belirli bir tarihten önceki verileri getirir.
    limitToLast(15) // Son 15 veriyi getiriyoruz (önceki sayfa)
  );

  const snapshot = await get(sortedPostsRef);
  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const posts = childSnapshot.val();
      const postId = childSnapshot.key;
      allPosts.push({
        photoURL: posts.photoURL || null,
        postId: postId,
        nick: posts.nick,
        content: posts.content,
        spoiler: posts.spoiler,
        attachedFilm: posts.attachedFilm,
        likesList: posts.likesList || null,
        likes: posts.likes,
        comments: posts.comments,
        edited: posts.edited || false,
        repost: posts.repost,
        repostsList: posts.repostsList || null,
        date: posts.date,
        userId: posts.userId.trim(),
        attachedAction: posts.attachedAction || null,
        actionName: posts.actionName || null,
      });
    });
  }
  return allPosts;
};

const deleteSelectedPost = async (postId) => {
  try {
    const postsRef = ref(database, `posts/${postId}`);
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      set(ref(database, `posts/${postId}`), null);
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

const updateSelectedPost = async (postId, data) => {
  try {
    const postRef = ref(database, `posts/${postId}/`);
    const snapshot = await get(postRef);
    if (snapshot.exists()) {
      const updates = {
        ...data,
      };
      await update(postRef, updates);
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
  const snapshot = await get(postsRef, orderByChild("date"));
  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      allPosts.push({
        date: childSnapshot.val().date,
        id: childSnapshot.val().id,
        postId: childSnapshot.val().postId,
        isComment: childSnapshot.val().isComment || false,
        relatedPostId: childSnapshot.val().relatedPostId || null,
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

const removeSelectedUserPostLikeLists = async (postId) => {
  try {
    const userPost = getAuth().currentUser.uid;
    const postsRef = ref(database, `likesList/${userPost}/`);
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().postId === postId) {
          set(ref(database, `likesList/${userPost}/${postId}`), null);
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

const getSpecificPost = async (postId) => {
  const postsRef = ref(database, `posts/${postId}`);
  const snapshot = await get(postsRef);
  const post = [];
  if (snapshot.exists()) {
    post.push({
      postId: snapshot.key,
      attachedFilm: snapshot.val()?.attachedFilm,
      comments: snapshot.val().comments,
      commentsList: snapshot.val().commentsList,
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
      attachedAction: snapshot.val().attachedAction || null,
      actionName: snapshot.val().actionName || null,
    });
  }
  return post;
};

const createCommentsList = async (postId, data) => {
  try {
    const newCommentRef = push(ref(database, `commentsList/${postId}/`));
    set(newCommentRef, {
      commentId: data.commentId,
      userId: data.userId,
      comment: data.comment,
      date: Date.now(),
      likes: 0,
      likesList: [],
      comments: 0,
      commentsList: [],
      reposts: 0,
      repostsList: [],
      isEdited: false,
      relatedPostId: data.relatedPostId,
      relatedUserId: data.relatedUserId,
    });
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

const deleteSelectedComment = async (postId, commentId) => {
  try {
    const commentsRef = ref(database, `commentsList/${postId}`);
    const snapshot = await get(commentsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().commentId === commentId) {
          set(ref(database, `commentsList/${postId}/${childSnapshot.key}`), null);
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

const updateSelectedComment = async (postId, commentId, data) => {
  try {
    const commentsRef = ref(database, `commentsList/${postId}`);
    const snapshot = await get(commentsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().commentId === commentId) {
          const updates = {};
          updates[`commentsList/${postId}/${childSnapshot.key}`] = { ...childSnapshot.val(), comment: data, isEdited: true };
          update(ref(database), updates);
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

const updateSelectedCommentLikes = async (postId, commentId, data) => {
  try {
    const commentsRef = ref(database, `commentsList/${postId}`);
    const snapshot = await get(commentsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().commentId === commentId) {
          const updates = {};
          updates[`commentsList/${postId}/${childSnapshot.key}`] = { ...childSnapshot.val(), ...data };
          update(ref(database), updates);
        }
      });
      return true;
    } else {
      return null;
    }
  } catch (error) {
    return toast("Something went wrong!");
  }
};

const getCommentsList = async (postId) => {
  const commentsRef = ref(database, `commentsList/${postId}`);
  const snapshot = await get(commentsRef);
  const comments = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      comments.push({
        commentKey: childSnapshot.key,
        commentId: childSnapshot.val().commentId,
        userId: childSnapshot.val().userId,
        comment: childSnapshot.val().comment,
        likes: childSnapshot.val().likes || 0,
        likesList: childSnapshot.val().likesList || [],
        comments: childSnapshot.val().comments || 0,
        commentsList: childSnapshot.val().commentsList || [],
        reposts: childSnapshot.val().reposts || 0,
        repostsList: childSnapshot.val().repostsList || [],
        date: childSnapshot.val().date,
        isEdited: childSnapshot.val().isEdited || false,
        relatedPostId: childSnapshot.val().relatedPostId,
        relatedUserId: childSnapshot.val().relatedUserId,
      });
    });
  }
  return comments;
};

const getSelectedComment = async (postId, commentId) => {
  const commentsRef = ref(database, `commentsList/${postId}/${commentId}`);
  const snapshot = await get(commentsRef);
  const comments = [];
  if (snapshot.exists()) {
    comments.push({
      commentId: snapshot.val().commentId,
      userId: snapshot.val().userId,
      comment: snapshot.val().comment,
      likes: snapshot.val().likes || 0,
      likesList: snapshot.val().likesList || [],
      comments: snapshot.val().comments || 0,
      commentsList: snapshot.val().commentsList || [],
      reposts: snapshot.val().reposts || 0,
      repostsList: snapshot.val().repostsList || [],
      date: snapshot.val().date,
      isEdited: snapshot.val().isEdited || false,
      relatedPostId: snapshot.val().relatedPostId,
      relatedUserId: snapshot.val().relatedUserId,
    });
  }
  return comments;
};

const createUserCommentsList = async (userId, data) => {
  try {
    const newCommentRef = push(ref(database, `userCommentsList/${userId}/`));
    set(newCommentRef, {
      commentId: data.commentId,
      userId: data.userId,
      comment: data.comment,
      date: Date.now(),
      likes: 0,
      likesList: [],
      comments: 0,
      commentsList: [],
      reposts: 0,
      repostsList: [],
      isEdited: false,
      relatedPostId: data.relatedPostId,
      relatedUserId: data.relatedUserId,
    });
    return true;
  } catch (error) {
    console.error(error);
  }
};

const updateUserCommentsList = async (userId, commentId, data) => {
  try {
    const commentsRef = ref(database, `userCommentsList/${userId}`);
    const snapshot = await get(commentsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().commentId === commentId) {
          const updates = {};
          updates[`userCommentsList/${userId}/${childSnapshot.key}`] = { ...childSnapshot.val(), comment: data, isEdited: true };
          update(ref(database), updates);
        }
      });
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteUserCommentsList = async (userId, commentId) => {
  try {
    const commentsRef = ref(database, `userCommentsList/${userId}`);
    const snapshot = await get(commentsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().commentId === commentId) {
          set(ref(database, `userCommentsList/${userId}/${childSnapshot.key}`), null);
        }
      });
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const getSelectedUserCommentsList = async (userId) => {
  const commentsRef = ref(database, `userCommentsList/${userId}`);
  const snapshot = await get(commentsRef);
  const comments = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      comments.push({
        key: childSnapshot.key,
        commentId: childSnapshot.val().commentId,
        userId: childSnapshot.val().userId,
        comment: childSnapshot.val().comment,
        likes: childSnapshot.val().likes || 0,
        likesList: childSnapshot.val().likesList || [],
        comments: childSnapshot.val().comments || 0,
        commentsList: childSnapshot.val().commentsList || [],
        reposts: childSnapshot.val().reposts || 0,
        repostsList: childSnapshot.val().repostsList || [],
        date: childSnapshot.val().date,
        isEdited: childSnapshot.val().isEdited || false,
        relatedPostId: childSnapshot.val().relatedPostId,
        relatedUserId: childSnapshot.val().relatedUserId,
      });
    });
  }
  return comments;
};

const getSelectedUserPostsList = async (userId) => {
  const postsRef = ref(database, `userPostsList/${userId}/posts/`);
  const snapshot = await get(postsRef);
  const posts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      posts.push(childSnapshot.val());
    });
  }
  return posts;
};

const getSelectedFilmComments = async (filmId) => {
  const postsRef = ref(database, "posts");
  const postQuery = query(postsRef, orderByChild("attachedFilmId"), equalTo(filmId));
  const snapshot = await get(postQuery);

  const allPosts = [];
  snapshot.forEach((childSnapshot) => {
    const post = childSnapshot.val();
    const postId = childSnapshot.key;
    allPosts.push({
      photoURL: post.photoURL || null,
      postId: postId,
      nick: post.nick,
      content: post.content,
      spoiler: post.spoiler,
      attachedFilm: post.attachedFilm,
      likesList: post.likesList || null,
      likes: post.likes,
      comments: post.comments,
      edited: post.edited || false,
      repost: post.repost,
      repostList: post.repostList || null,
      date: post.date,
      userId: post.userId.trim(),
      attachedAction: post.attachedAction || null,
      actionName: post.actionName || null,
    });
  });

  return allPosts;
};

const getSelectedUserPosts = async (postId) => {
  const selectedUserPosts = ref(database, `posts/${postId}`);
  const snapshot = await get(selectedUserPosts);
  const allPosts = [];
  if (snapshot.exists()) {
    allPosts.push(snapshot.val());
  }
  return allPosts;
};

const getSelectedUserPost = async (postId) => {
  const selectedUserPosts = ref(database, `posts/${postId}`);
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
      commentsList: snapshot.val().commentsList || [],
      edited: snapshot.val().edited,
      repost: snapshot.val().repost,
      date: snapshot.val().date,
      userId: snapshot.val().userId,
      attachedAction: snapshot.val().attachedAction || null,
      actionName: snapshot.val().actionName || null,
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
        id: childSnapshot.key,
        from: childSnapshot.val().from,
        date: childSnapshot.val().date,
        type: childSnapshot.val().type,
        isComment: childSnapshot.val().isComment || false,
        isRead: childSnapshot.val().isRead || false,
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
        comment: data.from.comment || null,
        uid: data.from.uid,
        nick: data.from.nick,
        photo: data.from.photo,
        postId: data.from?.postId || null,
        attached: data.from?.attached || null,
      },
      date: data.date,
      type: data.type,
      isRead: false,
      isDone: false,
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

const deleteSelectedNotification = async (notificationId) => {
  try {
    const uid = localStorage.getItem("user");
    const notificationsRef = ref(database, `notifications/${uid}/${notificationId}`);
    const snapshot = await get(notificationsRef);
    if (snapshot.exists()) {
      set(notificationsRef, null);
      return true;
    } else {
      return null;
    }
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

const changePinnedListTitle = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const pinnedListRef = ref(database, `pinnedList/${userId}`);
    const snapshot = await get(pinnedListRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === data.id) {
          const updates = {};
          updates[`pinnedList/${userId}/${childSnapshot.key}`] = {
            ...childSnapshot.val(),
            title: data.title || childSnapshot.val().title,
            edited: true,
            editedDate: Date.now(),
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
    return toast("Something went wrong!");
  }
};

const changedListupdatePinnedList = async (data) => {
  try {
    const userId = getAuth().currentUser.uid;
    const pinnedListRef = ref(database, `pinnedList/${userId}`);
    const snapshot = await get(pinnedListRef);

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === data[0].id) {
          const newChildRef = ref(database, `pinnedList/${userId}/${childSnapshot.key}/list`);
          set(newChildRef, data);
        }
      });
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
    return false;
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
        edited: childSnapshot.val().edited,
        editedDate: childSnapshot.val().editedDate,
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
      edited: snapshot.val().edited,
      editedDate: snapshot.val().editedDate,
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
        if (childSnapshot.val()?.list[itemId]) {
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

const getSelectedUserSharedList = async (userId) => {
  const sharedListRef = ref(database, `sharedList/${userId}`);
  const snapshot = await get(sharedListRef);
  const selectedUserSharedList = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserSharedList.push({
        id: childSnapshot.val().id,
        referenceId: childSnapshot.val().referenceId,
      });
    });
  }
  return selectedUserSharedList;
};

const deleteSelectedSharedList = async (userId, referenceId) => {
  try {
    const sharedListRef = ref(database, `sharedList/${userId}`);
    const snapshot = await get(sharedListRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().referenceId === referenceId) {
          set(ref(database, `sharedList/${userId}/${childSnapshot.key}`), null);
        }
      });
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

const createUserSuggestionLists = async (userId, data) => {
  try {
    const newSuggestionListRef = push(ref(database, `userSuggestionLists/${userId}`));
    await set(newSuggestionListRef, data);
    const refData = {
      id: userId,
      referenceId: newSuggestionListRef.key,
    };
    const newSharedListRef = push(ref(database, `sharedList/${data.from.uid}`));
    await set(newSharedListRef, refData);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteUserSuggestionLists = async (userId, referenceId) => {
  try {
    const suggestionListsRef = ref(database, `userSuggestionLists/${userId}`);
    const snapshot = await get(suggestionListsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === referenceId) {
          set(ref(database, `userSuggestionLists/${userId}/${childSnapshot.key}`), null);
        }
      });
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

const getSelectedUserSuggestionLists = async (userId) => {
  const suggestionListsRef = ref(database, `userSuggestionLists/${userId}/`);
  const snapshot = await get(suggestionListsRef);
  const selectedUserSuggestionLists = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserSuggestionLists.push({
        id: childSnapshot.val().id,
        title: childSnapshot.val().title,
        date: childSnapshot.val().date,
        from: childSnapshot.val().from,
        list: childSnapshot.val().list || null,
        userId: childSnapshot.val().userId,
        nodeId: childSnapshot.key,
      });
    });
  }
  return selectedUserSuggestionLists;
};

const deleteSelectedUserSuggestionListsListItem = async (userId, listId, id) => {
  try {
    const suggestionListsRef = ref(database, `userSuggestionLists/${userId}`);
    const snapshot = await get(suggestionListsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === listId) {
          set(ref(database, `userSuggestionLists/${userId}/${childSnapshot.key}/list/${id}`), null);
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

const updateSelectedUserSuggestionLists = async (userId, listId, data) => {
  try {
    const suggestionListsRef = ref(database, `userSuggestionLists/${userId}`);
    const snapshot = await get(suggestionListsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key === listId) {
          const newSuggestionListsListRef = push(ref(database, `userSuggestionLists/${userId}/${listId}/list`));
          set(newSuggestionListsListRef, data);
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

const deleteSelectedUserSuggestionList = async (userId, listId) => {
  try {
    const suggestionListsRef = ref(database, `userSuggestionLists/${userId}`);
    const snapshot = await get(suggestionListsRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === listId) {
          set(ref(database, `userSuggestionLists/${userId}/${childSnapshot.key}`), null);
        }
      });
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteAccount = async () => {
  try {
    deleteUser(auth.currentUser);
    return true;
  } catch (error) {
    console.error(error);
    return toast("Something went wrong!");
  }
};

export {
  createUserWithEmailAction,
  createNickForUser,
  isNickUnique,
  signInWithEmailAction,
  getCurrentUserData,
  setOnlineStatus,
  getUserOnlineStatus,
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
  createFeedAction,
  editSelectedPost,
  getInitialPosts,
  getAllPosts,
  getPreviousPosts,
  deleteSelectedPost,
  updateSelectedPost,
  getSpecificPost,
  createCommentsList,
  deleteSelectedComment,
  updateSelectedComment,
  updateSelectedCommentLikes,
  getCommentsList,
  getSelectedComment,
  createUserCommentsList,
  updateUserCommentsList,
  deleteUserCommentsList,
  getSelectedUserCommentsList,
  getSelectedUserPostsList,
  getSelectedFilmComments,
  getSelectedUserPosts,
  getSelectedUserPost,
  getNotifications,
  createNotification,
  deleteUserNotification,
  deleteSelectedNotification,
  createPinnedList,
  changePinnedListTitle,
  changedListupdatePinnedList,
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
  getSelectedUserSharedList,
  deleteSelectedSharedList,
  createUserSuggestionLists,
  deleteUserSuggestionLists,
  getSelectedUserSuggestionLists,
  deleteSelectedUserSuggestionListsListItem,
  updateSelectedUserSuggestionLists,
  deleteSelectedUserSuggestionList,
  deleteAccount,
};
