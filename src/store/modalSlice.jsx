import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalState: false,
    modalName: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.modalState = true;
      state.modalName = action.payload;
    },
    closeModal: (state) => {
      state.modalState = false;
      state.modalName = "";
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
