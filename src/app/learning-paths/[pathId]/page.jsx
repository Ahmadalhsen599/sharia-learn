'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchCourses } from '../../../../store/slices/coursesSlice';

export default function LearningPathsPage() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">جاري التحميل...</p>;
  if (error) return <p className="text-center text-red-600">خطأ: {error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">المسارات التعليمية</h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {course.cover_image && (
              <img
                src={course.cover_image}
                alt={course.course_name}
                className="w-full h-44 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-bold text-gray-800 mb-1">{course.course_name}</h2>
            {course.subtitle && <p className="text-sm text-gray-500 mb-1">{course.subtitle}</p>}
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">{course.description}</p>
            <div className="text-xs text-gray-500 mb-4">
              <strong>النوع:</strong> {course.course_type} |{' '}
              <strong>الدروس:</strong> {course.lesson_count}
            </div>
            <Link href={`/courses/${course.id}`}>
              <span className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer text-sm">
                عرض الكورس
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
