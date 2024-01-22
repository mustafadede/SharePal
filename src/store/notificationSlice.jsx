import { createSlice } from "@reduxjs/toolkit";

const notification = createSlice({
  name: "notification",
  initialState: {
    notificationList: [],
    status: null,
    followRequest: [],
    followRequestStatus: false,
  },
  reducers: {
    setNotification: (state, action) => {
      state.notificationList = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    deleteSelectedNotification: (state, action) => {
      state.notificationList = state.notificationList.filter((notification) => notification.id !== action.payload);
    },
    updateFollowRequest: (state) => {
      state.followRequestStatus = !state.followRequestStatus;
    },
  },
});

export const notificationActions = notification.actions;
export default notification.reducer;
