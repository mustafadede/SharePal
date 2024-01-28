import { createSlice } from "@reduxjs/toolkit";

const usersSuggestionsListSlice = createSlice({
  name: "usersSuggestionsList",
  initialState: {
    usersSuggestionsList: [],
  },
  reducers: {
    initialUsersSuggestionsList(state, action) {
      state.usersSuggestionsList = action.payload;
    },
    updateUsersSuggestionsList(state, action) {
      state.usersSuggestionsList = [...state.usersSuggestionsList, action.payload];
    },
    removeUsersSuggestionsList(state, action) {
      state.usersSuggestionsList = state.usersSuggestionsList.filter((list) => list.id !== action.payload);
    },
  },
});

export const usersSuggestionsListActions = usersSuggestionsListSlice.actions;
export default usersSuggestionsListSlice.reducer;
