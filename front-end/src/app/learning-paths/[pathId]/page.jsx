import Link from 'next/link';
import Image from 'next/image';

// بيانات ثابتة موسعة
const learningPaths = [
    {
        id: 'hifz',
        name: 'تحفيظ القرآن',
        description: 'مسار متكامل لحفظ القرآن الكريم بأحكام التجويد',
        image: '/images/hifz.jpg',
        instructor: 'الشيخ أحمد محمد',
        courses: [
            {
                id: 'hifz-beginner',
                title: 'الحفظ للمبتدئين',
                description: 'تعلم أساسيات الحفظ الصحيح من سورة الفاتحة إلى سورة الناس',
                image: '/images/hifz-beginner.jpg',
                duration: '6 أسابيع',
                level: 'مبتدئ',
                videos: 15,
                exercises: 5
            },
            {
                id: 'hifz-intermediate',
                title: 'الحفظ للمتوسطين',
                description: 'تطوير مهارات الحفظ من الجزء الأول إلى الجزء العاشر',
                image: '/images/hifz-intermediate.jpg',
                duration: '8 أسابيع',
                level: 'متوسط',
                videos: 20,
                exercises: 8
            },
            {
                id: 'hifz-advanced',
                title: 'الحفظ المتقدم',
                description: 'إتقان الحفظ مع المراجعة الدورية للجزء الأول إلى الجزء العشرين',
                image: '/images/hifz-advanced.jpg',
                duration: '12 أسبوع',
                level: 'متقدم',
                videos: 30,
                exercises: 12
            }
        ]
    },
    {
        id: 'tafsir',
        name: 'تفسير القرآن',
        description: 'فهم معاني القرآن الكريم وأسراره',
        image: '/images/tafsir.jpg',
        instructor: 'الدكتور محمد علي',
        courses: [
            {
                id: 'tafsir-baqarah',
                title: 'تفسير سورة البقرة',
                description: 'شرح مفصل لأطول سورة في القرآن الكريم',
                image: '/images/tafsir-baqarah.jpg',
                duration: '10 أسابيع',
                level: 'متوسط',
                videos: 25,
                exercises: 10
            },
            {
                id: 'tafsir-yaseen',
                title: 'تفسير سورة يس',
                description: 'دراسة متعمقة لسورة يس وفضائلها',
                image: '/images/tafsir-yaseen.jpg',
                duration: '6 أسابيع',
                level: 'مبتدئ',
                videos: 15,
                exercises: 6
            }
        ]
    },
    {
        id: 'tajweed',
        name: 'تجويد القرآن',
        description: 'تعلم أحكام التلاوة والتجويد الصحيحة',
        image: '/images/tajweed.jpg',
        instructor: 'الشيخ عمر عبدالكافي',
        courses: [
            {
                id: 'tajweed-basics',
                title: 'أحكام النون الساكنة والتنوين',
                description: 'إتقان أحكام الإظهار والإدغام والإقلاب والإخفاء',
                image: '/images/tajweed-basics.jpg',
                duration: '4 أسابيع',
                level: 'مبتدئ',
                videos: 12,
                exercises: 4
            },
            {
                id: 'tajweed-advanced',
                title: 'أحكام المدود والوقف',
                description: 'دراسة متقدمة لأحكام المدود وأنواع الوقف',
                image: '/images/tajweed-advanced.jpg',
                duration: '6 أسابيع',
                level: 'متوسط',
                videos: 18,
                exercises: 8
            }
        ]
    },
    {
        id: 'fiqh',
        name: 'فقه العبادات',
        description: 'تعلم أحكام الطهارة والصلاة والصيام',
        image: '/images/fiqh.jpg',
        instructor: 'الدكتور عبدالله المصلح',
        courses: [
            {
                id: 'fiqh-prayer',
                title: 'فقه الصلاة',
                description: 'أحكام الصلاة من التكبير إلى التسليم',
                image: '/images/fiqh-prayer.jpg',
                duration: '5 أسابيع',
                level: 'مبتدئ',
                videos: 15,
                exercises: 5
            },
            {
                id: 'fiqh-fasting',
                title: 'فقه الصيام',
                description: 'أحكام الصيام وقيام رمضان',
                image: '/images/fiqh-fasting.jpg',
                duration: '4 أسابيع',
                level: 'مبتدئ',
                videos: 12,
                exercises: 4
            }
        ]
    }
];

export default function LearningPathPage({ params }) {
    const path = learningPaths.find(p => p.id === params.pathId);
    
    if (!path) {
        return (
            <div className="p-4 text-center">
                <h1 className="text-2xl font-bold text-red-600">المسار غير موجود</h1>
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
                    <Image 
                        src={path.image}
                        alt={path.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{path.name}</h1>
                            <p className="text-gray-600 mb-4">{path.description}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {path.courses.length} كورسات
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600 mt-2">
                        <span className="ml-2">المحاضر: {path.instructor}</span>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">الكورسات المتاحة</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {path.courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="relative h-48">
                            <Image 
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    {course.level}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                            
                            <div className="flex justify-between text-sm text-gray-500 mb-4">
                                <span>🕒 {course.duration}</span>
                                <span>🎥 {course.videos} فيديو</span>
                                <span>✍️ {course.exercises} تمرين</span>
                            </div>
                            
                            <Link 
                                href={`/courses/${course.id}`}
                                className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-lg transition-colors font-medium"
                            >
                                ابدأ التعلم
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}