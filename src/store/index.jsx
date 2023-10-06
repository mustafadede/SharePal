import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import createPostSlice from "./createPostSlice";
import modalSlice from "./modalSlice";
import myListsSlice from "./myListsSlice";
import profileSlice from "./profileSlice";
import postsSlice from "./postsSlice";
import followingSlice from "./followingSlice";
import followersSlice from "./followersSlice";
import notificationSlice from "./notificationSlice";
import wantToWatchSlice from "./wantToWatchSlice";
import watchedSlice from "./watchedSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    profile: profileSlice,
    createPost: createPostSlice,
    modal: modalSlice,
    myLists: myListsSlice,
    notification: notificationSlice,
    posts: postsSlice,
    wantToWatch: wantToWatchSlice,
    watched: watchedSlice,
    following: followingSlice,
    followers: followersSlice,
  },
});

export default store;
