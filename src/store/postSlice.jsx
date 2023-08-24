import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPosts } from "../firebase/firebaseActions";

const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await getAllPosts();
  const data = await response.json();
  return data;
});

export { fetchPosts };
