import { createSlice } from "@reduxjs/toolkit";

const popularSlice = createSlice({
  name: "popular",
  initialState: {
    popularName: "movies",
  },
  reducers: {
    updatePopular: (state, action) => {
      state.popularName = action.payload;
    },
    updatePopularState: (state, action) => {
      state.popularState = action.payload;
    },
  },
});

export const popularActions = popularSlice.actions;
export default popularSlice.reducer;
