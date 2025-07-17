'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStarAndCrescent } from 'react-icons/fa';

export default function Hero() {
  return (
    <div className="relative h-screen overflow-hidden" dir="rtl">
      {/* الخلفية */}
      <Image
        src="/images/rt.jpg"
        alt="وصف الصورة"
        fill
        priority
        className="object-cover"
      />

      {/* تغطية تدرج أسود شفاف من الأسفل للأعلى */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

      {/* المحتوى الرئيسي */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-6 md:px-12 text-white">
        {/* النص على اليمين */}
        <div className="max-w-xl text-right space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug drop-shadow-md">
            مرحبًا بك في اقرأ
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-relaxed drop-shadow-md">
            أفضل منصة تعليمية لتحفيظ القرآن الكريم ودراسة العلوم الشرعية بأسلوب عصري ومنهجي.
          </p>
        </div>

        {/* العنصر المتحرك على اليسار */}
        <motion.div
          initial={{ y: -30 }}
          animate={{ y: 30 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 2,
          }}
          className="hidden md:flex flex-col items-center justify-center text-center"
        >
          <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-green-300/30 w-full max-w-md">
            {/* الأيقونة الزخرفية */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform text-yellow-300 text-3xl drop-shadow-lg">
              <FaStarAndCrescent />
            </div>

            {/* النص المتحرك */}
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
              className="text-white text-xl md:text-2xl font-bold leading-relaxed tracking-wide"
            >
              ﴿ وَقُلْ رَبِّ زِدْنِي عِلْمًا ﴾
            </motion.div>

            {/* خط زخرفي */}
            <div className="mt-4 h-1 w-16 mx-auto bg-green-400 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
