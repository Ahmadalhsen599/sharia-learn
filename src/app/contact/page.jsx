export default function ContactPage() {
    return (
        <section className="p-4 max-w-6xl mx-auto" dir="rtl">
            <h1 className="text-3xl font-bold text-center mb-8 text-green-500">تواصل معنا</h1>

            <section className="flex flex-col md:flex-row gap-8">
                {/* الخريطة */}
                <div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2798813236!2d-74.25986768706302!3d40.69767006447239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250b3287b85fb%3A0x295df2a25dcfb79b!2sNew%20York%2C%20USA!5e0!3m2!1sar!2s!4v1718123456789"
                        width="100%"
                        height="100%"
                        className="h-[500px] w-full"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* نموذج التواصل */}
                <form className="md:w-1/2 w-full bg-white shadow-md rounded-xl p-6 space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            الاسم الكامل
                        </label>
                        <input
                            type="text"
                            placeholder="أدخل اسمك"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            البريد الإلكتروني
                        </label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            الرسالة
                        </label>
                        <textarea
                            rows="5"
                            placeholder="اكتب رسالتك هنا..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-8 py-2 rounded-full text-lg hover:bg-green-700 transition"
                        >
                            إرسال
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
}
