import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaMosque } from 'react-icons/fa'; // استيراد الأيقونات
import Link from 'next/link'; // استيراد Link من Next.js

export default function FooterPage() {
    return (
        <div className="bg-green-500 text-white py-4 mt-8">
            <div className="max-w-6xl mx-auto text-center">
                <div className="flex items-center justify-center space-x-4 mb-2">
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                        <FaMosque className="text-green-500 text-2xl" /> {/* أيقونة المسجد */}
                    </div>
                    <h2 className="text-3xl font-bold">اقرأ</h2>
                </div>
                <p className="mb-4">© 2025 منصة اقرأ. جميع الحقوق محفوظة.</p>
                <div className="flex justify-center space-x-8 mb-4">
                    <Link href="/about" className="hover:underline">حول</Link>
                    <Link href="/support" className="hover:underline">الدعم</Link>
                    <Link href="/contact" className="hover:underline">اتصل بنا</Link>
                </div>
                <div className="flex justify-center space-x-8">
                    <Link
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <FaFacebook className="text-white hover:text-gray-300" size={24} />
                    </Link>
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <FaInstagram className="text-white hover:text-gray-300" size={24} />
                    </Link>
                    <Link
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <FaTwitter className="text-white hover:text-gray-300" size={24} />
                    </Link>
                    <Link
                        href="https://whatsapp.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <FaWhatsapp className="text-white hover:text-gray-300" size={24} />
                    </Link>
                </div>
            </div>
        </div>
    );
}