import React from 'react';

const CourseCardItem = ({ title, image, description }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
};

const CourseCard = () => {
    const popularCourses = [
        { id: 1, title: 'تحفيظ القرآن', image: '/images/76fbc6dd1557d2f0f1b5ab2dd787007e.jpg.webp', description: 'دورة لتحفيظ القرآن الكريم بأسلوب تفاعلي.' },
        { id: 2, title: 'تفسير القرآن', image: '/images/76fbc6dd1557d2f0f1b5ab2dd787007e.jpg.webp', description: 'دورة لفهم معاني القرآن وتفسيره.' },
        { id: 3, title: 'تجويد القرآن', image: '/images/76fbc6dd1557d2f0f1b5ab2dd787007e.jpg.webp', description: 'دورة لتعلم تجويد القرآن وتحسين القراءة.' },
    ];

    return (
        <div className="p-4" dir="rtl">
            <h1 className="text-3xl font-bold text-center mb-6 text-green-500">أشهر الدورات</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {popularCourses.map(course => (
                    <CourseCardItem 
                        key={course.id} 
                        title={course.title} 
                        image={course.image} 
                        description={course.description} 
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseCard;