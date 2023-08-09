import { createSlice } from "@reduxjs/toolkit";

const myListsSlice = createSlice({
  name: "myLists",
  initialState: {
    myLists: [],
    length: 0,
    hasListsIncludePinned: false,
  },
  reducers: {
    setMyLists: (state, action) => {
      state.myLists.push(action.payload);
      state.length++;
    },
    setPinned: (state, action) => {
      state.myLists[action.payload].isPinned = !state.myLists[action.payload].isPinned;
      state.hasListsIncludePinned = true;
    },
    deleteList: (state, action) => {
      state.myLists = state.myLists.filter((list) => list.id !== action.payload);
      state.length--;
    },
  },
});

export const MyListsActions = myListsSlice.actions;
export default myListsSlice.reducer;
