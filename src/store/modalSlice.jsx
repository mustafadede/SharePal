import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalState: false,
    modalName: "",
    modalHasData: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.modalState = true;
      state.modalName = action.payload.name;
      state.modalHasData = action.payload?.data ? action.payload.data : false;
    },
    closeModal: (state, action) => {
      state.modalState = false;
      state.modalName = "";
      state.modalHasData = action.payload?.data ? action.payload.data : "";
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
