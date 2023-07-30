import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
  },
  reducers: {
    updatePost: (state, action) => {
      state.post.push(action.payload);
    },
    removePost: (state) => {
      state.post = null;
    },
  },
});

export const postActions = postSlıce.actions;
export default postSlice.reducer;
