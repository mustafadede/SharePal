import { createSlice } from "@reduxjs/toolkit";

const wantToWatch = createSlice({
  name: "wantToWatch",
  initialState: {
    wantToWatchList: [],
    loading: false,
    error: null,
  },
  reducers: {
    update: (state, action) => {
      state.wantToWatchList.push(action.payload);
    },
    reset: (state) => {
      state.wantToWatchList = [];
    },
  },
});

export const wantToWatchActions = wantToWatch.actions;
export default wantToWatch.reducer;
