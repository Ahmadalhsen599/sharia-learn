export default function About() {
    return (
        <div className="p-4 max-w-6xl mx-auto" dir="rtl">
            <h1 className="text-3xl font-bold text-center mb-8 text-green-500">عن المنصة</h1>

            <div className="flex flex-col md:flex-row items-center mb-10">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                    <p className="text-lg mb-4 leading-loose">
                        مرحبًا بكم في منصتنا! نحن نقدم تجربة تعليمية فريدة تهدف إلى تعزيز المعرفة وتوفير موارد تعليمية قيمة.
                        يتمتع معلمونا بخبرة واسعة في مجالاتهم، ونحن هنا لمساعدتكم على تحقيق أهدافكم التعليمية.
                    </p>
                    <p className="text-lg leading-loose">
                        انضم إلينا واستفد من مجموعة متنوعة من الدورات والموارد التي تساعدك على النمو والتعلم بفعالية.
                        نحن هنا لدعمك في كل خطوة على الطريق.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-xl">
                        <iframe
                            className="w-full h-64"
                            src="https://www.youtube.com/embed/VIDEO_ID" // استبدل VIDEO_ID برقم الفيديو الخاص بك
                            title="فيديو تعريفي"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* الرؤية والرسالة */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">رؤيتنا</h2>
                <p className="text-lg leading-loose">
                    نطمح إلى تمكين الأفراد بالمعرفة والأدوات اللازمة لتحقيق التميز في مجالاتهم.
                </p>

                <h2 className="text-2xl font-semibold text-green-600 mt-8 mb-4">رسالتنا</h2>
                <p className="text-lg leading-loose">
                    تقديم محتوى تعليمي موثوق ومتاح للجميع، بأسلوب مبسط وتفاعلي يعزز من تجربة التعلم الذاتي.
                </p>
            </section>

            {/* فريق العمل */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">فريق العمل</h2>
                <p className="text-lg leading-loose">
                    يتكون فريقنا من معلمين محترفين ومطورين ملتزمين بتقديم أفضل تجربة تعليمية عبر الإنترنت.
                </p>
            </section>

            {/* القيم */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">قيمنا</h2>
                <ul className="list-disc list-inside text-lg leading-loose">
                    <li>الاحترافية في تقديم المحتوى</li>
                    <li>الوصول المجاني والعادل للجميع</li>
                    <li>الاستمرارية في التعلم وتحديث المحتوى</li>
                    <li>الابتكار في الأساليب التعليمية</li>
                </ul>
            </section>

            {/* زر التواصل */}
            <div className="text-center mt-12">
                <a
                    href="/contact"
                    className="inline-block bg-green-600 text-white py-2 px-8 rounded-full text-lg hover:bg-green-700 transition"
                >
                    تواصل معنا
                </a>
            </div>
        </div>
    );
}
