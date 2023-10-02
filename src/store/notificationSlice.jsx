import { createSlice } from "@reduxjs/toolkit";

const notification = createSlice({
  name: "notification",
  initialState: {
    notificationList: [],
    status: null,
  },
  reducers: {
    setNotification: (state, action) => {
      state.notificationList = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const notificationActions = notification.actions;
export default notification.reducer;
