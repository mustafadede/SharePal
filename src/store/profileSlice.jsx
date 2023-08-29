import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileUser: {
      photoURL: "",
    },
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
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
