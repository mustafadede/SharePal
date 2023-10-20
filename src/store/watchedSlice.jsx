import { createSlice } from "@reduxjs/toolkit";

const watched = createSlice({
  name: "watched",
  initialState: {
    watchedMovieList: [],
    watchedSeriesList: [],
    loading: false,
    error: null,
  },
  reducers: {
    inititilize: (state, action) => {
      action.payload.type === "tv" ? (state.watchedSeriesList = action.payload.data) : (state.watchedMovieList = action.payload.data);
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
