// pages/api/courses.js
export default function handler(req, res) {
    const coursesData = [
        { name: 'تحفيظ القرآن', link: '/courses/hifz' },
        { name: 'تفسير القرآن', link: '/courses/tafsir' },
        { name: 'تجويد القرآن', link: '/courses/tajweed' },
        { name: 'فقه العبادات', link: '/courses/fiqh' },
        // يمكنك إضافة المزيد من الدورات هنا
    ];
    res.status(200).json(coursesData);
}