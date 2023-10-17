import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileUser: {
      photoURL: "",
      followers: 0,
      following: 0,
      totalSeries: 0,
      totalFilms: 0,
    },
    profileState: "loading",
  },
  reducers: {
    updateUser: (state, action) => {
      state.profileUser = action.payload;
    },
    removeUser: (state) => {
      state.profileUser = null;
    },
    updateProfilePhoto: (state, action) => {
      state.profileUser.photoURL = action.payload;
    },
    updateFollowers: (state, action) => {
      state.profileUser.followers = action.payload;
    },
    updateFollowing: (state, action) => {
      state.profileUser.following = action.payload;
    },
    updateTotalSeries: (state, action) => {
      state.profileUser.totalSeries = action.payload;
    },
    updateTotalFilms: (state, action) => {
      state.profileUser.totalFilms = action.payload;
    },
    updateState: (state, action) => {
      state.profileState = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
