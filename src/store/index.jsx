import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import createPostSlice from "./createPostSlice";
import modalSlice from "./modalSlice";
import myListsSlice from "./myListsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    createPost: createPostSlice,
    modal: modalSlice,
    myLists: myListsSlice,
  },
});

export default store;
