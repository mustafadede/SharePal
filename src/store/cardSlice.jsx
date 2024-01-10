import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardState: false,
    cardData: [],
  },
  reducers: {
    updateData: (state, action) => {
      state.cardData = action.payload;
    },
  },
});

export const cardActions = cardSlice.actions;
export default cardSlice.reducer;
