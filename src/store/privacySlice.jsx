import { createSlice } from "@reduxjs/toolkit";

const privacySlice = createSlice({
  name: "privacy",
  initialState: {
    AccountPrivacy: "Public",
    ListPrivacy: "Public",
    taggingPrivacy: "Public",
  },
  reducers: {
    setAccountPrivacy(state, action) {
      state.AccountPrivacy = action.payload;
    },
    setListPrivacy(state, action) {
      state.ListPrivacy = action.payload;
    },
    setTaggingPrivacy(state, action) {
      state.taggingPrivacy = action.payload;
    },
  },
});

export const privacyActions = privacySlice.actions;
export default privacySlice.reducer;
