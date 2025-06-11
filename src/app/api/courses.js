// pages/api/courses.js
export default function handler(req, res) {
  const coursesData = [
    {
      id: 'hifz',
      name: 'تحفيظ القرآن',
      description: 'مسار متكامل لحفظ القرآن الكريم'
    }
  ];
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(coursesData);
}