import { createSlice } from "@reduxjs/toolkit";

const unfinishedSlice = createSlice({
  name: "unfinished",
  initialState: {
    unfinishedList: [],
    loading: false,
    error: null,
  },
  reducers: {
    update: (state, action) => {
      state.unfinishedList.push(action.payload);
    },
    reset: (state) => {
      state.unfinishedList = [];
    },
  },
});

export const unfinishedActions = unfinishedSlice.actions;
export default unfinishedSlice.reducer;
