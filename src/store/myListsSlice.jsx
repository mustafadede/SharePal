import { createSlice } from "@reduxjs/toolkit";

const myListsSlice = createSlice({
  name: "myLists",
  initialState: {
    myLists: [],
    pinnedLists: [],
  },
  reducers: {
    setMyLists: (state, action) => {
      state.myLists.push(action.payload);
    },
    setPinned: (state, action) => {
      state.myLists[action.payload].isPinned = !state.myLists[action.payload].isPinned;
      if (state.myLists[action.payload].isPinned) {
        state.pinnedLists.push(state.myLists[action.payload]);
      } else {
        state.pinnedLists = state.pinnedLists.filter((list) => list.id !== state.myLists[action.payload].id);
      }
    },
    deleteList: (state, action) => {
      state.myLists = state.myLists.filter((list) => list.id !== action.payload);
    },
  },
});

export const MyListsActions = myListsSlice.actions;
export default myListsSlice.reducer;
