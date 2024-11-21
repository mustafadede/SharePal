import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    text: "",
    post: [],
    attachedFilm: null,
    attachedFilmId: null,
    attachedPhoto: null,
    postsLength: -1,
    spoiler: false,
    tagFlag: false,
  },
  reducers: {
    tagFlag: (state, action) => {
      state.tagFlag = action.payload;
    },
    updateText: (state, action) => {
      state.text = action.payload;
    },
    resetText: (state) => {
      state.text = "";
    },
    updateAttachedFilm: (state, action) => {
      state.attachedFilm = action.payload;
    },
    updateSpoiler: (state, action) => {
      state.spoiler = action.payload;
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
