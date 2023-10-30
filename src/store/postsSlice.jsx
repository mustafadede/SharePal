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
    resetPosts: (state) => {
      state.posts = [];
    },
    pushPosts: (state, action) => {
      state.posts.push(action.payload);
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.postId !== action.payload);
    },
    updateLike: (state, action) => {
      const index = state.posts.findIndex((post) => post.postId === action.payload.postId);
      state.posts[index].likes = action.payload.likes;
      state.posts[index].likesList = action.payload.likesList;
    },
    repostPost: (state, action) => {
      const index = state.posts.findIndex((post) => post.postId === action.payload.postId);
      state.posts[index].repost = action.payload.repost;
      state.posts[index].repostsList = action.payload.repostsList;
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
