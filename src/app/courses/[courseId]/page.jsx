'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { coursesData } from '@/app/api/courses';

export default function CourseDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId;

  const course = coursesData.find(c => c.id === courseId);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setIsLoggedIn(!!user);
  }, []);

  const handleRegister = () => {
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', `/courses/${courseId}/${course.firstLessonId || ''}`);
      router.push('/login');
      return;
    }

    const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses') || '[]');
    if (!registeredCourses.includes(courseId)) {
      registeredCourses.push(courseId);
      localStorage.setItem('registeredCourses', JSON.stringify(registeredCourses));
    }

    router.push(`/courses/${courseId}/${course.firstLessonId || ''}`);
  };

  if (!courseId || !course) {
    return (
      <div className="p-6 text-center text-red-600" dir="rtl">
        الكورس غير موجود أو غير صالح.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-right" dir="rtl">
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-green-700">{course.title}</h1>

        {/* قسم ماذا ستتعلم */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">ماذا ستتعلم:</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {(course.goals || []).map((goal, i) => (
              <li key={i}>{goal}</li>
            ))}
          </ul>
        </div>

        {/* وصف الكورس */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">وصف الكورس:</h2>
          <p className="text-lg text-gray-800 leading-relaxed">{course.description}</p>
        </div>

        {/* زر التسجيل */}
        <div className="pt-6 text-center">
          <button
            onClick={handleRegister}
            className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white text-lg font-medium px-8 py-3 rounded-xl shadow"
          >
            سجّل الآن
          </button>
        </div>
      </div>
    </div>
  );
}
