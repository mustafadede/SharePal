import { createSlice } from "@reduxjs/toolkit";

const myListsSlice = createSlice({
  name: "myLists",
  initialState: {
    myLists: [],
    status: null,
  },
  reducers: {
    initilizeList: (state, action) => {
      state.myLists = action.payload;
    },
    setMyLists: (state, action) => {
      state.myLists.push(action.payload);
    },
    setPinned: (state, action) => {
      state.myLists[action.payload].isPinned = !state.myLists[action.payload].isPinned;
    },
    deleteListItem: (state, action) => {
      state.myLists = state.myLists.filter((list) => list.id !== action.payload);
    },
    addToList: (state, action) => {
      state.myLists[action.payload.listNum].list.push(action.payload);
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const MyListsActions = myListsSlice.actions;
export default myListsSlice.reducer;
