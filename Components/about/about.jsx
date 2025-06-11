export default function About() {
    return (
        <div className="p-4" dir="rtl">
            <h1 className="text-3xl font-bold text-center mb-6 text-green-500">عن المنصة</h1>
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
                    <p className="text-lg mb-4">
                        مرحبًا بكم في منصتنا! نحن نقدم تجربة تعليمية فريدة تهدف إلى تعزيز المعرفة وتوفير موارد تعليمية قيمة.
                        يتمتع معلمونا بخبرة واسعة في مجالاتهم، ونحن هنا لمساعدتكم على تحقيق أهدافكم التعليمية.
                    </p>
                    <p className="text-lg">
                        انضم إلينا واستفد من مجموعة متنوعة من الدورات والموارد التي تساعدك على النمو والتعلم بفعالية.
                        نحن هنا لدعمك في كل خطوة على الطريق.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/VIDEO_ID" // استبدل VIDEO_ID برقم الفيديو الخاص بك
                        title="فيديو تعريفي"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}