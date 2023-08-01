import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import createPostSlice from "./createPostSlice";
import allPostsSlice from "./allPostsSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    createPost: createPostSlice,
    allPosts: allPostsSlice,
  },
});

export default store;
