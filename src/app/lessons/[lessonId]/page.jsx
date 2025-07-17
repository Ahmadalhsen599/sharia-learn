'use client';
import { useEffect, useState } from 'react';

const topics = [
  { id: 1, title: 'المقدمة' },
  { id: 2, title: 'الموضوع الرئيسي' },
];

const rawLessons = [
  {
    id: 101,
    topic_id: 1,
    order: 1,
    title: 'مقدمة الدرس الأول',
    content: 'هذا هو محتوى الدرس الأول في المقدمة.',
    image_url: 'https://via.placeholder.com/300x150?text=Intro+Lesson+1',
  },
  {
    id: 102,
    topic_id: 1,
    order: 2,
    title: 'مقدمة الدرس الثاني',
    content: 'هذا هو محتوى الدرس الثاني في المقدمة.',
    image_url: 'https://via.placeholder.com/300x150?text=Intro+Lesson+2',
  },
  {
    id: 201,
    topic_id: 2,
    order: 1,
    title: 'درس في الموضوع الرئيسي',
    content: 'تفاصيل هذا الدرس المتعلق بالموضوع الرئيسي.',
    image_url: 'https://via.placeholder.com/300x150?text=Main+Topic+Lesson',
  },
];

// دالة لجلب حالات الدروس من localStorage
const loadLessonStatuses = () => {
  const stored = localStorage.getItem('lessonStatuses');
  return stored ? JSON.parse(stored) : {};
};

// دالة لحفظ الحالات
const saveLessonStatuses = (statuses) => {
  localStorage.setItem('lessonStatuses', JSON.stringify(statuses));
};

function StatusBadge({ status }) {
  const colors = {
    completed: 'bg-green-100 text-green-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    locked: 'bg-gray-200 text-gray-400',
  };
  const labels = {
    completed: 'مكتمل',
    'in-progress': 'جاري',
    locked: 'مغلق',
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded font-semibold ${colors[status] || 'bg-gray-100 text-gray-500'}`}
    >
      {labels[status] || 'غير معروف'}
    </span>
  );
}

export default function CourseLessons() {
  const [lessonStatuses, setLessonStatuses] = useState({});
  const [expandedTopicId, setExpandedTopicId] = useState(topics[0].id);
  const [activeLessonId, setActiveLessonId] = useState(null);

  // تحميل الحالات من التخزين
  useEffect(() => {
    const savedStatuses = loadLessonStatuses();
    setLessonStatuses(savedStatuses);

    // تعيين أول درس
    const firstLesson = rawLessons.find((l) => l.topic_id === topics[0].id);
    if (firstLesson) {
      setActiveLessonId(firstLesson.id);
      updateStatus(firstLesson.id, 'in-progress');
    }
  }, []);

  // تحديث حالة الدرس
  const updateStatus = (lessonId, status) => {
    const updated = { ...lessonStatuses, [lessonId]: status };
    setLessonStatuses(updated);
    saveLessonStatuses(updated);
  };

  // دروس مع الحالة المضافة
  const lessons = rawLessons.map((lesson) => {
    const status = lessonStatuses[lesson.id] || 'not-started';
    return { ...lesson, status };
  });

  const activeLesson = lessons.find((l) => l.id === activeLessonId);

  const handleLessonClick = (lesson) => {
    if (lesson.status === 'locked') return;
    setActiveLessonId(lesson.id);
    updateStatus(lesson.id, 'in-progress');
  };

  const markAsCompleted = () => {
    if (activeLesson) {
      updateStatus(activeLesson.id, 'completed');
    }
  };

  return (
    <div className="flex h-screen font-sans" dir="rtl">
      {/* قائمة الموضوعات والدروس */}
      <aside className="w-96 border-l bg-white shadow-md overflow-auto">
        <h2 className="text-xl font-bold p-4 border-b">المحتوى التعليمي</h2>
        <div>
          {topics.map((topic) => {
            const topicLessons = lessons
              .filter((l) => l.topic_id === topic.id)
              .sort((a, b) => a.order - b.order);
            const isExpanded = expandedTopicId === topic.id;

            return (
              <div key={topic.id} className="border-b">
                <button
                  onClick={() => {
                    setExpandedTopicId(topic.id);
                    const first = topicLessons[0];
                    if (first) {
                      setActiveLessonId(first.id);
                      updateStatus(first.id, 'in-progress');
                    }
                  }}
                  className={`w-full text-right px-4 py-3 flex justify-between items-center
                    ${isExpanded ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-100'}
                    focus:outline-none`}
                >
                  <span>{topic.title}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* قائمة الدروس */}
                {isExpanded && (
                  <ul className="px-6 pb-4">
                    {topicLessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        className={`flex justify-between items-center cursor-pointer py-2 rounded
                          ${
                            lesson.id === activeLessonId
                              ? 'bg-blue-100 font-semibold'
                              : 'hover:bg-gray-50'
                          }
                          ${lesson.status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        <span>{lesson.order}. {lesson.title}</span>
                        <StatusBadge status={lesson.status} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* عرض محتوى الدرس */}
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        {activeLesson ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{activeLesson.title}</h1>
            {activeLesson.image_url && (
              <img
                src={activeLesson.image_url}
                alt={activeLesson.title}
                className="mb-6 max-w-full rounded shadow"
              />
            )}
            <p className="text-lg leading-relaxed whitespace-pre-line mb-6">
              {activeLesson.content}
            </p>
            {activeLesson.status !== 'completed' && (
              <button
                onClick={markAsCompleted}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                إنهاء الدرس
              </button>
            )}
            {activeLesson.status === 'completed' && (
              <div className="text-green-700 font-semibold">✓ تم إنهاء هذا الدرس</div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-xl">لم يتم اختيار درس</p>
        )}
      </main>
    </div>
  );
}
