// store/slices/coursesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// thunk وهمي لمحاكاة جلب بيانات من API
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    // هنا تستبدل هذا بجلب API حقيقي لاحقًا، مثال:
    // const res = await fetch('/api/courses');
    // return await res.json();

    // بيانات وهمية مؤقتة (نفس بياناتك)
 return [
  {
    id: 'hifz-beginner',
    course_name: 'تحفيظ القرآن للمبتدئين',
    course_type: 'فيديو',
    subtitle: 'منهج تدريجي للمبتدئين',
    description: 'كورس لحفظ القرآن خطوة بخطوة بطريقة سهلة ومنظمة.',
    cover_image: '/images/hifz-beginner.jpg',
    lesson_count: 20,
  },
  {
    id: 'hifz-intermediate',
    course_name: 'تحفيظ القرآن للمستوى المتوسط',
    course_type: 'فيديو',
    subtitle: 'لمن حفظ أساسيات السور الأولى',
    description: 'تكملة لحفظ القرآن مع مراجعة وتكرار شامل.',
    cover_image: '/images/hifz-intermediate.jpg',
    lesson_count: 30,
  },
  {
    id: 'tafsir-baqarah',
    course_name: 'تفسير سورة البقرة',
    course_type: 'فيديو مباشر',
    subtitle: 'شرح تفصيلي بأسلوب مبسط',
    description: 'شرح معاني سورة البقرة تفصيليًا مع ربطها بالواقع.',
    cover_image: '/images/tafsir-baqarah.jpg',
    lesson_count: 25,
  },
  {
    id: 'tafsir-ali-imran',
    course_name: 'تفسير سورة آل عمران',
    course_type: 'فيديو مباشر',
    subtitle: 'سورة آل عمران وتطبيقاتها الحياتية',
    description: 'شرح مفصل لسورة آل عمران مع دروس وعبر تربوية.',
    cover_image: '/images/tafsir-ali-imran.jpg',
    lesson_count: 22,
  },
  {
    id: 'tajweed-basics',
    course_name: 'أساسيات التجويد',
    course_type: 'فيديو',
    subtitle: 'مدخل مبسط لقواعد التجويد',
    description: 'شرح مبسط لأهم قواعد التجويد مع أمثلة تطبيقية.',
    cover_image: '/images/tajweed-basics.jpg',
    lesson_count: 18,
  },
  {
    id: 'fiqh-prayer',
    course_name: 'فقه الصلاة',
    course_type: 'فيديو',
    subtitle: 'أركان وشروط الصلاة',
    description: 'شرح كامل لفقه الصلاة بأسلوب مبسط للمتعلمين الجدد.',
    cover_image: '/images/fiqh-prayer.jpg',
    lesson_count: 16,
  },
  {
    id: 'aqeedah-intro',
    course_name: 'مدخل إلى العقيدة الإسلامية',
    course_type: 'فيديو مباشر',
    subtitle: 'مفاهيم التوحيد والإيمان',
    description: 'تأسيس فهم صحيح لعقيدة المسلم مع أدلة من القرآن والسنة.',
    cover_image: '/images/aqeedah-intro.jpg',
    lesson_count: 12,
  },
  {
    id: 'arabic-beginner',
    course_name: 'العربية للمبتدئين',
    course_type: 'فيديو',
    subtitle: 'أساسيات اللغة العربية',
    description: 'تعلم قواعد النحو والصرف للمبتدئين بأسلوب تفاعلي.',
    cover_image: '/images/arabic-beginner.jpg',
    lesson_count: 21,
  }
];
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default coursesSlice.reducer;
