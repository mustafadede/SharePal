import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    hasUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.hasUser = action.payload;
      localStorage.setItem("user", action.payload);
    },
    logout: (state) => {
      state.hasUser = null;
      localStorage.removeItem("user");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
