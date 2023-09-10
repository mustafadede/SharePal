import { createSlice } from "@reduxjs/toolkit";

const followersSlice = createSlice({
  name: "followers",
  initialState: {
    followersLists: [],
  },
  reducers: {
    initialFollowers: (state, action) => {
      state.followersLists = action.payload;
    },
    updateFollowers: (state, action) => {
      state.followersLists.push(action.payload);
    },
  },
});
export const followersActions = followersSlice.actions;
export default followersSlice.reducer;
