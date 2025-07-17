// store/slices/lessonsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// بيانات تجريبية مؤقتة
const staticLessons = [
  {
    id: 101,
    topic_id: 1,
    order: 1,
    title: 'مقدمة الدرس الأول',
    content: 'محتوى الدرس الأول',
    image_url: 'https://via.placeholder.com/300x150?text=Intro+Lesson+1',
  },
  {
    id: 102,
    topic_id: 1,
    order: 2,
    title: 'مقدمة الدرس الثاني',
    content: 'محتوى الدرس الثاني',
    image_url: 'https://via.placeholder.com/300x150?text=Intro+Lesson+2',
  },
  {
    id: 201,
    topic_id: 2,
    order: 1,
    title: 'درس في الموضوع الرئيسي',
    content: 'محتوى الموضوع الرئيسي',
    image_url: 'https://via.placeholder.com/300x150?text=Main+Topic+Lesson',
  },
];

// جلب البيانات بشكل وهمي الآن (وسيصبح من API لاحقًا)
export const fetchLessons = createAsyncThunk('lessons/fetchLessons', async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(staticLessons);
    }, 500);
  });
});

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    data: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default lessonsSlice.reducer;
