// src/features/category/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchCategories = createAsyncThunk('category/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8001/api/category');
    return response.data.data.reverse();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchCategory = createAsyncThunk('category/fetchCategory', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:8001/api/category/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addCategory = createAsyncThunk('category/addCategory', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8001/api/category', formData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:8001/api/category/${id}`, formData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`http://localhost:8001/api/category/${id}`);
    return { id, status: response.status };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Slice
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    category: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((category) => category._id !== action.payload.id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
