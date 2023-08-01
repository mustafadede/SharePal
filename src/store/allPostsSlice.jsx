import { createSlice } from "@reduxjs/toolkit";

const allPostsSlice = createSlice({
  name: "allPosts",
  initialState: {
    allPosts: [],
  },
  reducers: {
    updateAllPosts: (state, action) => {
      state.allPosts.push(...action.payload);
    },
  },
});

export const allPostsActions = allPostsSlice.actions;
export default allPostsSlice.reducer;
