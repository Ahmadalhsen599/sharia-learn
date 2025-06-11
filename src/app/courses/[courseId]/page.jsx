import { FaPlay, FaBook, FaTasks, FaCertificate, FaClock, FaUser, FaLock, FaCheck } from 'react-icons/fa';
import Link from 'next/link';

// بيانات الفيديوهات والوحدات
const coursesData = {
    'hifz-beginner': {
        title: 'الحفظ للمبتدئين',
        description: 'تعلم أساسيات الحفظ الصحيح من سورة الفاتحة إلى سورة الناس',
        image: '/images/hifz-beginner.jpg',
        instructor: 'الشيخ أحمد محمد',
        duration: '6 أسابيع',
        level: 'مبتدئ',
        modules: [
            {
                title: 'الأسبوع الأول: المقدمة',
                description: 'أساسيات البدء في الحفظ',
                lessons: [
                    { id: '1', title: 'مقدمة الكورس وأهدافه', duration: '15 دقيقة', type: 'فيديو', free: true },
                    { id: '2', title: 'أفضل طرق الحفظ', duration: '22 دقيقة', type: 'فيديو', free: true },
                    { id: '3', title: 'تمرين تطبيقي', duration: '10 دقيقة', type: 'تمرين', free: false }
                ]
            },
            {
                title: 'الأسبوع الثاني: سورة الفاتحة',
                description: 'حفظ وتثبيت سورة الفاتحة',
                lessons: [
                    { id: '4', title: 'تلاوة سورة الفاتحة', duration: '18 دقيقة', type: 'فيديو', free: true },
                    { id: '5', title: 'شرح معاني السورة', duration: '25 دقيقة', type: 'فيديو', free: false },
                    { id: '6', title: 'اختبار قصير', duration: '15 دقيقة', type: 'اختبار', free: false }
                ]
            }
        ]
    },
    'tafsir-baqarah': {
        title: 'تفسير سورة البقرة',
        description: 'شرح مفصل لأطول سورة في القرآن الكريم',
        image: '/images/tafsir-baqarah.jpg',
        instructor: 'الدكتور محمد علي',
        duration: '10 أسابيع',
        level: 'متوسط',
        modules: [
            {
                title: 'المقدمة',
                description: 'فضائل سورة البقرة',
                lessons: [
                    { id: '1', title: 'فضائل السورة', duration: '20 دقيقة', type: 'فيديو', free: true },
                    { id: '2', title: 'المحور العام للسورة', duration: '30 دقيقة', type: 'فيديو', free: false }
                ]
            }
        ]
    }
};

export default function CoursePage({ params }) {
    const course = coursesData[params.courseId];

    // تحقق مما إذا كان الكورس موجودًا
    if (!course) {
        return (
            <div className="p-4 text-center">
                <h1 className="text-2xl font-bold text-red-600">الكورس غير موجود</h1>
                <Link href="/learning-paths" className="text-green-600 hover:underline mt-2 inline-block">
                    ← العودة لصفحة المسارات
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4" dir="rtl">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative h-64">
                    <img 
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h1>
                            <p className="text-gray-600 mb-4">{course.description}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {course.level}
                        </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                            <FaUser className="ml-1" />
                            <span>المحاضر: {course.instructor}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaClock className="ml-1" />
                            <span>المدة: {course.duration}</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                            سجل في الكورس
                        </button>
                        <button className="bg-white border border-green-500 text-green-500 hover:bg-green-50 px-6 py-2 rounded-lg transition-colors font-medium">
                            معاينة مجانية
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">محتوى الكورس</h2>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {course.modules.map((module, index) => (
                            <div key={index} className="border-b last:border-b-0">
                                <div className="p-4 bg-gray-50 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium">{module.title}</h3>
                                        <p className="text-sm text-gray-500">{module.description}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">{module.lessons.length} دروس</span>
                                </div>
                                <ul className="divide-y">
                                    {module.lessons.map((lesson, idx) => (
                                        <li key={idx} className="p-4 hover:bg-gray-50">
                                            <div className="flex items-center">
                                                <div className={`p-2 rounded-full mr-3 ${lesson.free ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                    {lesson.type === 'فيديو' ? <FaPlay /> : <FaTasks />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h4 className="font-medium">{lesson.title}</h4>
                                                        {!lesson.free && <FaLock className="text-gray-400" />}
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        {lesson.duration} • {lesson.type}
                                                    </p>
                                                </div>
                                                {lesson.free ? (
                                                    <Link 
                                                        href={`/courses/${params.courseId}/lessons/${lesson.id}`}
                                                        className="text-green-500 hover:text-green-700 ml-2"
                                                    >
                                                        شاهد الآن
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-400 ml-2">تسجيل مطلوب</span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold mb-4">معلومات الكورس</h2>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <h3 className="font-medium mb-2">متطلبات الكورس</h3>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                            <li>معرفة أساسية بالقراءة العربية</li>
                            <li>مصحف شخصي</li>
                            <li>دفتر ملاحظات</li>
                            <li>التزام بجدول الحفظ</li>
                        </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="font-medium mb-2">ماذا ستتعلم؟</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <FaCheck className="text-green-500 mt-1 ml-1 flex-shrink-0" />
                                <span className="text-gray-600 mr-2">طريقة حفظ القرآن بطريقة صحيحة</span>
                            </li>
                            <li className="flex items-start">
                                <FaCheck className="text-green-500 mt-1 ml-1 flex-shrink-0" />
                                <span className="text-gray-600 mr-2">أساسيات المراجعة اليومية</span>
                            </li>
                            <li className="flex items-start">
                                <FaCheck className="text-green-500 mt-1 ml-1 flex-shrink-0" />
                                <span className="text-gray-600 mr-2">تجاوز صعوبات الحفظ</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}