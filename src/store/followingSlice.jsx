import { createSlice } from "@reduxjs/toolkit";

const followingSlice = createSlice({
  name: "following",
  initialState: {
    followingList: [],
    length: 0,
  },
  reducers: {
    initialFollowing: (state, action) => {
      const newFollowing = action.payload;
      state.followingList = newFollowing;
      state.length = newFollowing.length - 1;
    },
    updateFollowing: (state, action) => {
      state.followingList.push(action.payload);
      state.length = state.followingList.length - 1;
    },
    removeFollowing: (state, action) => {
      const newFollowing = state.followingList.filter((user) => user.uid !== action.payload);
      state.followingList = newFollowing;
      state.length = state.followingList.length;
    },
    resetFollowing: (state) => {
      state.followingList = [];
      state.length = 0;
    },
  },
});
export const followingActions = followingSlice.actions;
export default followingSlice.reducer;
