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
      state.cardComments.push(action.payload);
    },
    updateComments: (state, action) => {
      state.cardComments.unshift(action.payload);
      state.cardData[0].comments = state.cardData[0]?.comments + 1;
    },
    editComments: (state, action) => {
      state.cardComments.map((comment) => {
        if (comment.commentId === action.payload.commentId) {
          comment.comment = action.payload.text;
        }
      });
    },
    deleteComments: (state, action) => {
      state.cardComments = state.cardComments.filter((comment) => comment.commentId !== action.payload);
      state.cardData[0].comments = state.cardData[0]?.comments - 1;
    },
    updateCommentsState: (state, action) => {
      state.commentsState = action.payload;
    },
    resetComments: (state) => {
      state.cardComments = [];
    },
  },
});

export const cardActions = cardSlice.actions;
export default cardSlice.reducer;
