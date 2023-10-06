import { createSlice } from "@reduxjs/toolkit";

const watched = createSlice({
  name: "watched",
  initialState: {
    watchedList: [],
    loading: false,
    error: null,
  },
  reducers: {
    inititilize: (state, action) => {
      state.watchedList = action.payload;
    },
    update: (state, action) => {
      state.watchedList.push(action.payload);
    },
    reset: (state) => {
      state.watchedList = [];
    },
  },
});

export const watchedActions = watched.actions;
export default watched.reducer;
