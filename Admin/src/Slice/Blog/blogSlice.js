// src/features/blog/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const BASE_URL = "http://localhost:8001/api/blog";

// Thunks
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/get`);
    return response.data.data.reverse();
  } catch (error) {
    return rejectWithValue(error.response?.data || "An error occurred while fetching blogs.");
  }
});

export const fetchSingleBlog = createAsyncThunk("blog/fetchSingleBlog", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/change/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "An error occurred while fetching the blog.");
  }
});

export const addBlog = createAsyncThunk("blog/addBlog", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, formData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "An error occurred while adding the blog.");
  }
});

export const updateBlog = createAsyncThunk("blog/updateBlog", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${BASE_URL}/change/${id}`, formData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "An error occurred while updating the blog.");
  }
});

export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/change/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || "An error occurred while deleting the blog.");
  }
});

// Slice
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Blog
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Blog
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) => (blog._id === action.payload._id ? action.payload : blog));
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
