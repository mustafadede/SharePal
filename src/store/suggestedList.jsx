import { createSlice } from "@reduxjs/toolkit";

const suggestedList = createSlice({
  name: "suggestedList",
  initialState: {
    suggestedList: [],
  },
  reducers: {
    setSuggestedList: (state, action) => {
      state.suggestedList = action.payload;
    },
    addSuggestedList: (state, action) => {
      state.suggestedList.push(action.payload);
    },
    deleteSuggestedList: (state, action) => {
      state.suggestedList = state.suggestedList.filter((suggested) => suggested.id !== action.payload);
    },
  },
});

export const SuggestedListActions = suggestedList.actions;
export default suggestedList.reducer;
