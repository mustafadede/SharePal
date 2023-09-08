import { createSlice } from "@reduxjs/toolkit";

const followingSlice = createSlice({
  name: "following",
  initialState: {
    followingList: [],
    length: 0,
  },
  reducers: {
    updateFollowing: (state, action) => {
      state.followingList.push(action.payload);
      state.length = state.followingList.length;
    },
    removeFollowing: (state, action) => {
      const newFollowing = state.followingList.filter((user) => user.uid !== action.payload);
      state.followingList = newFollowing;
      state.length = state.followingList.length;
    },
  },
});
export const followingActions = followingSlice.actions;
export default followingSlice.reducer;
