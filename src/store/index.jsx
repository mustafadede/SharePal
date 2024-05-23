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
import unfinishedSlice from "./unfinishedSlice";
import splashSlice from "./splashSlice";
import cardSlice from "./cardSlice";
import privacySlice from "./privacySlice";
import UsersSuggestionsListSlice from "./UsersSuggestionsListSlice";
import suggestedList from "./suggestedList";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    profile: profileSlice,
    suggestedList: suggestedList,
    createPost: createPostSlice,
    modal: modalSlice,
    myLists: myListsSlice,
    notification: notificationSlice,
    posts: postsSlice,
    wantToWatch: wantToWatchSlice,
    watched: watchedSlice,
    unfinished: unfinishedSlice,
    following: followingSlice,
    followers: followersSlice,
    splash: splashSlice,
    card: cardSlice,
    privacy: privacySlice,
    usersSuggestionsList: UsersSuggestionsListSlice,
  },
});

export default store;
