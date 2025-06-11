// app/courses/[courseId]/[lessonId]/page.jsx
import { FaPlay, FaArrowLeft, FaBook, FaDownload, FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';

// بيانات الدروس لكل كورس
const lessonsData = {
    'hifz-beginner': {
        '1': {
            title: 'مقدمة الكورس',
            description: 'تعريف بالكورس وأهدافه وطريقة الدراسة',
            duration: '15 دقيقة',
            videoUrl: '/videos/hifz-beginner/1.mp4',
            resources: [
                { name: 'ملخص الدرس PDF', url: '/resources/hifz-beginner/1.pdf' },
                { name: 'تمارين تطبيقية', url: '/resources/hifz-beginner/1-exercises.pdf' }
            ],
            nextLesson: '2'
        },
        '2': {
            title: 'طريقة الحفظ الصحيحة',
            description: 'تعلم الطريقة المثلى لحفظ القرآن الكريم',
            duration: '25 دقيقة',
            videoUrl: '/videos/hifz-beginner/2.mp4',
            resources: [
                { name: 'خطوات الحفظ', url: '/resources/hifz-beginner/2.pdf' }
            ],
            prevLesson: '1',
            nextLesson: '3'
        }
    },
    'tafsir-baqarah': {
        '1': {
            title: 'فضائل سورة البقرة',
            description: 'فضائل السورة كما وردت في السنة النبوية',
            duration: '20 دقيقة',
            videoUrl: '/videos/tafsir-baqarah/1.mp4',
            resources: [
                { name: 'الأحاديث الصحيحة', url: '/resources/tafsir-baqarah/1.pdf' }
            ],
            nextLesson: '2'
        }
    }
};

export default function LessonPage({ params }) {
    const courseId = params.courseId;
    const lessonId = params.lessonId;
    const lesson = lessonsData[courseId]?.[lessonId];
    
    if (!lesson) {
        return (
            <div className="p-4 text-center">
                <h1 className="text-2xl font-bold text-red-600">الدرس غير موجود</h1>
                <Link href={`/courses/${courseId}`} className="text-green-600 hover:underline mt-2 inline-block">
                    ← العودة للكورس
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4" dir="rtl">
            <div className="flex justify-between items-center mb-6">
                <Link 
                    href={`/courses/${courseId}`}
                    className="flex items-center text-green-600 hover:text-green-800"
                >
                    <FaArrowLeft className="ml-1" />
                    <span>العودة للكورس</span>
                </Link>
                
                <div className="flex items-center text-gray-500">
                    <FaClock className="ml-1" />
                    <span>{lesson.duration}</span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative pt-[56.25%] bg-black"> {/* نسبة 16:9 */}
                    <video 
                        controls
                        className="absolute top-0 left-0 w-full h-full"
                        poster={`/thumbnails/${courseId}/${lessonId}.jpg`}
                    >
                        <source src={lesson.videoUrl} type="video/mp4" />
                        متصفحك لا يدعم تشغيل الفيديو
                    </video>
                </div>
                
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{lesson.title}</h1>
                    <p className="text-gray-600 mb-6">{lesson.description}</p>
                    
                    <div className="flex gap-3">
                        {lesson.prevLesson && (
                            <Link
                                href={`/courses/${courseId}/${lesson.prevLesson}`}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors flex items-center"
                            >
                                <FaArrowLeft className="ml-1" />
                                الدرس السابق
                            </Link>
                        )}
                        
                        {lesson.nextLesson ? (
                            <Link
                                href={`/courses/${courseId}/${lesson.nextLesson}`}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                            >
                                الدرس التالي
                                <FaPlay className="mr-1" />
                            </Link>
                        ) : (
                            <Link
                                href={`/courses/${courseId}`}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                إنهاء الكورس
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">المواد المصاحبة</h2>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <ul className="divide-y">
                            {lesson.resources.map((resource, index) => (
                                <li key={index} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className="bg-green-100 p-2 rounded-full mr-3">
                                            <FaDownload className="text-green-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{resource.name}</h4>
                                            <p className="text-sm text-gray-500">PDF • {resource.url.split('.').pop().toUpperCase()}</p>
                                        </div>
                                        <a 
                                            href={resource.url} 
                                            download
                                            className="text-green-500 hover:text-green-700 px-3 py-1 border border-green-500 rounded-lg"
                                        >
                                            تحميل
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-medium flex items-center">
                                <FaQuestionCircle className="ml-2 text-blue-500" />
                                مناقشة الدرس
                            </h3>
                        </div>
                        <div className="p-4">
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows="3"
                                placeholder="اطرح سؤالك أو مشاركتك حول هذا الدرس..."
                            ></textarea>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2">
                                نشر المشاركة
                            </button>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold mb-4">ملاحظاتك</h2>
                    <div className="bg-white rounded-lg shadow-md p-4 h-64">
                        <textarea 
                            className="w-full h-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="دوّن ملاحظاتك أثناء الدرس..."
                        ></textarea>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">
                            حفظ الملاحظات
                        </button>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
                        <h3 className="font-medium mb-2">تقدمك في الكورس</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-green-500 h-2.5 rounded-full" 
                                style={{ width: '25%' }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">25% مكتمل</p>
                    </div>
                </div>
            </div>
        </div>
    );
}