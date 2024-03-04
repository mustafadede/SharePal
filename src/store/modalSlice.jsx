import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalState: false,
    modalName: "",
    modalHasData: false,
    lastModalName: "",
    dragable: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.modalState = true;
      state.modalName = action.payload.name;
      state.lastModalName = "";
      state.modalHasData = action.payload?.data ? action.payload.data : false;
    },
    closeModal: (state, action) => {
      state.modalState = false;
      state.modalHasData = action.payload?.data ? action.payload.data : "";
      state.modalName = action.payload?.name ? action.payload.name : "";
      state.dragable = false;
    },
    renameList: (state, action) => {
      state.modalHasData.title = action.payload;
    },
    assignLastModalName: (state, action) => {
      state.lastModalName = action.payload;
    },
    updateDragable: (state, action) => {
      state.dragable = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
