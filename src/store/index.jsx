import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import createPostSlice from "./createPostSlice";
import modalSlice from "./modalSlice";
import myListsSlice from "./myListsSlice";
import postActionSlice from "./postActionSlice";
import profileSlice from "./profileSlice";
import postsSlice from "./postsSlice";
import followingSlice from "./followingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    profile: profileSlice,
    createPost: createPostSlice,
    modal: modalSlice,
    myLists: myListsSlice,
    postAction: postActionSlice,
    posts: postsSlice,
    following: followingSlice,
  },
});

export default store;
