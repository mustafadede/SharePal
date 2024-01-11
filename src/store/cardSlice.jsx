import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardState: false,
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
    updateComments: (state, action) => {
      state.cardComments = action.payload;
    },
  },
});

export const cardActions = cardSlice.actions;
export default cardSlice.reducer;
