import { createSlice } from "@reduxjs/toolkit";

const splashSlice = createSlice({
  name: "splash",
  initialState: {
    section: 0,
  },
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
    },
  },
});

export const splashActions = splashSlice.actions;
export default splashSlice.reducer;
