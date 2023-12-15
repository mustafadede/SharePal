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
    deleteList: (state, action) => {
      state.myLists = state.myLists.filter((list) => list.id !== action.payload);
    },
    deleteListItem: (state, action) => {
      state.myLists[action.payload.listId].list = Object.values(state.myLists[action.payload.listId].list).filter(
        (_, index) => index !== action.payload.findIndex
      );
    },
    setSelectedList: (state, action) => {
      state.myLists[action.payload.listId].list = action.payload.list;
    },
    addListItem: (state, action) => {
      const data = {
        id: action.payload.data.id,
        title: action.payload.data.title,
        poster: action.payload.data.poster,
        releaseDate: action.payload.data.releaseDate,
        backdrop: action.payload.data.backdrop,
      };
      Object(state.myLists[action.payload.listId].list)[data.id] = data;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    updateListTitle: (state, action) => {
      state.myLists.forEach((list) => {
        if (list.id === action.payload.listId) {
          list.title = action.payload.title;
        }
      });
    },
  },
});

export const MyListsActions = myListsSlice.actions;
export default myListsSlice.reducer;
