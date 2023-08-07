import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    text: "",
    post: [],
    attachedFilm: null,
    attachedPhoto: null,
    postsLength: -1,
  },
  reducers: {
    updateText: (state, action) => {
      state.text = action.payload;
    },
    updateAttachedFilm: (state, action) => {
      state.attachedFilm = action.payload;
    },
    updateAttachedPhoto: (state, action) => {
      state.attachedPhoto = action.payload;
    },
    updatePost: (state, action) => {
      state.postsLength++;
      state.post.push(action.payload);
    },
    removePost: (state) => {
      state.post = null;
    },
  },
});

export const createPostActions = createPostSlice.actions;
export default createPostSlice.reducer;