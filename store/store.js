// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/coursesSlice';
import lessonsReducer from './slices/lessonsSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    lessons: lessonsReducer,
  },
});
