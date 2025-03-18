import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addBanner = createAsyncThunk('banner/addBanner', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8001/api/banner', formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchBanners = createAsyncThunk('banner/fetchBanners', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8001/api/banner');
    // console.log(response)
    return response.data.data.reverse();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchBanner = createAsyncThunk('banner/fetchBanner', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:8001/api/banner/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateBanner = createAsyncThunk('banner/updateBanner', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:8001/api/banner/${id}`, formData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteBanner = createAsyncThunk('banner/deleteBanner', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`http://localhost:8001/api/banner/${id}`);
    return { id, status: response.status };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    banners: [],
    banner: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners.push(action.payload);
      })
      .addCase(addBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = state.banners.map((banner) =>
          banner._id === action.payload._id ? action.payload : banner
        );
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = state.banners.filter((banner) => banner._id !== action.payload.id);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bannerSlice.reducer;
