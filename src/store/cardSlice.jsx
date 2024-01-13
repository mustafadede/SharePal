import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardState: false,
    commentsState: false,
    cardData: [],
    cardComments: [],
  },
  reducers: {
    updateData: (state, action) => {
      state.cardData = action.payload;
    },
    updateState: (state, action) => {
      state.cardState = action.payload;
    },
    initilizeComments: (state, action) => {
      state.cardComments = action.payload;
    },
    updateComments: (state, action) => {
      state.cardComments.unshift(action.payload);
    },
    deleteComments: (state, action) => {
      const index = state.cardComments.findIndex((item) => item.commentId === action.payload);
      state.cardComments.splice(index, 1);
    },
    updateCommentsState: (state, action) => {
      state.commentsState = action.payload;
    },
  },
});

export const cardActions = cardSlice.actions;
export default cardSlice.reducer;
