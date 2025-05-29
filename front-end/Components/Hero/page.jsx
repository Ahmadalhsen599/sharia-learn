import Image from 'next/image'; 

export default function Hero() {
    return (
        <div className="relative h-screen">
            <Image 
                src="/images/rt.jpg" // ضع مسار الصورة هنا
                alt="وصف الصورة"
                layout="fill" // يجعل الصورة تملأ الحاوية
              style={{ objectFit: "cover" }}
                priority
                className=" opacity-70" // ضبط الشفافية
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-bold">مرحبًا بك في صفحتنا</h1>
                <p className="mt-4 text-2xl font-bold  ">أفضل منصة تعليمية لتحفيظ القرأن ودراسة العلوم الشرعية</p>
                <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    انقر هنا
                </button>
            </div>
        </div>
    );
}