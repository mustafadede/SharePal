import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalState: false,
  },
  reducers: {
    openModal: (state) => {
      state.modalState = true;
    },
    closeModal: (state) => {
      state.modalState = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
