import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: null,
    error: null,
  },
  reducers: {
    updatePosts: (state, action) => {
      state.posts = action.payload;
      state.status = "success";
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
