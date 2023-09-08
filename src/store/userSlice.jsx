import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    followUser: (state, action) => {
      state.user.following = action.payload;
    },
    unfollowUser: (state, action) => {
      state.user.following = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
