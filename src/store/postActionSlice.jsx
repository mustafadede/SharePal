import { createSlice } from "@reduxjs/toolkit";

const postActionSlicer = createSlice({
  name: "postAction",
  initialState: {
    postLikesNumber: 0,
    postCommentsNumber: 0,
    postRepostsNumber: 0,
    postLikesList: [],
    postCommentsList: [],
    postRepostsList: [],
  },
  reducers: {
    addPostToLikesList: (state, action) => {
      state.postLikesList.push(action.payload);
      state.postLikesNumber++;
    },
    removePostFromLikesList: (state, action) => {
      state.postLikesList = state.postLikesList.filter((item) => item.id !== action.payload);
      state.postLikesNumber--;
    },
    updatePostComments: (state, action) => {
      state.postCommentsList.push(action.payload);
    },
    updatePostToRepostList: (state, action) => {
      state.postRepostsList.push(action.payload);
      state.postRepostsNumber++;
    },
    removePostFromRepostList: (state, action) => {
      state.postRepostsList = state.postRepostsList.filter((item) => item.id !== action.payload);
      state.postRepostsNumber--;
    },
  },
});

export const postActionActions = postActionSlicer.actions;
export default postActionSlicer.reducer;
