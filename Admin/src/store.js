// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './Slice/Banner/bannerSlice';
import categoryReducer from './Slice/Category/categorySlice'; // Import the new category slice
import blogReducer from './Slice/Blog/blogSlice';
export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    category: categoryReducer, // Add the new category reducer here
    blog: blogReducer,
  },
});

export default store;
