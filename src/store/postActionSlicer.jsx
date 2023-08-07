import { createSlice } from "@reduxjs/toolkit";

const postActionSlicer = createSlice({
  name: "postAction",
  initialState: {
    postId: null,
    postLikes: 0,
    postComments: 0,
    postReplies: 0,
    postLikesList: [],
    postCommentsList: [],
    postRepliesList: [],
    postIsLiked: false,
    postIsReposted: false,
  },
  reducers: {
    updatePostId: (state, action) => {
      state.postId = action.payload;
    },
    updatePostComments: (state, action) => {
      state.postComments = action.payload;
    },
    updatePostReplies: (state, action) => {
      state.postReplies = action.payload;
    },
    updatePostLikesList: (state, action) => {
      state.postLikesList.push(action.payload);
    },
    updatePostCommentsList: (state, action) => {
      state.postCommentsList.push(action.payload);
    },
    updatePostRepliesList: (state, action) => {
      state.postRepliesList.push(action.payload);
    },
    updatePostIsLiked: (state) => {
      state.postIsLiked = !state.postIsLiked;
      state.postIsLiked ? state.postLikes++ : state.postLikes--;
    },
    updatePostIsReposted: (state) => {
      state.postIsReposted = !state.postIsReposted;
      state.postIsReposted ? state.postReplies++ : state.postReplies--;
    },
  },
});

export const postActionActions = postActionSlicer.actions;
export default postActionSlicer.reducer;
