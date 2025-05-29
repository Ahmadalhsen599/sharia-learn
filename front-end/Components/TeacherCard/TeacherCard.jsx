// pages/teachers.js
"use client";
import React from 'react';


const TeacherCard = () => {
    const certifiedTeachers = [
        { id: 1, name: 'أحمد العلي', image: '/images/sh.jfif', specialty: 'تحفيظ القرآن' },
        { id: 2, name: 'فاطمة الزهراء', image: '/images/a-veiled-saudi-arabian-gulf-thumbnail-44117.webp', specialty: 'تفسير القرآن' },
    ];

    return (
        <div className="p-4" dir="rtl">
            <h1 className="text-3xl font-bold text-center mb-6 text-green-500">معلمون معتمدون</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifiedTeachers.map(teacher => (
                    <TeacherCard key={teacher.id} name={teacher.name} image={teacher.image} specialty={teacher.specialty} />
                ))}
            </div>
        </div>
    );
};

export default TeacherCard;