'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaMosque, FaBars, FaTimes, FaSearch, FaUser, FaSignInAlt, FaBook } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const NavbarWithFilter = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [query, setQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [learningPaths, setLearningPaths] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const searchRef = useRef();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const fetchLearningPaths = async () => {
            try {
                const mockData = [
                    { id: 'hifz', name: 'تحفيظ القرآن', description: 'مسار متكامل لحفظ القرآن الكريم' },
                    { id: 'tafsir', name: 'تفسير القرآن', description: 'فهم معاني القرآن الكريم' },
                    { id: 'tajweed', name: 'تجويد القرآن', description: 'تعلم أحكام التلاوة الصحيحة' }
                ];
                setLearningPaths(mockData);
            } catch (error) {
                console.error('Error fetching learning paths:', error);
            }
        };
        fetchLearningPaths();
        setIsMounted(true);

        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setSearchOpen(false);
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setQuery('');
        }
    };

    const handleQueryChange = (value) => {
        setQuery(value);
        if (value.trim().length > 0) {
            setLoading(true);
            const results = learningPaths.filter(path =>
                path.name.toLowerCase().includes(value.toLowerCase()) ||
                path.description.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(results);
            setSearchOpen(true);
            setLoading(false);
        } else {
            setSearchOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    const handlePathClick = () => {
        setDropdownOpen(false);
        setMenuOpen(false);
    };

    if (!isMounted) {
        return (
            <nav className="bg-green-500 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <div className="h-10 w-10 bg-white rounded-full"></div>
                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">اقرأ</h2>
                </div>
                <div className="md:hidden flex items-center space-x-4 space-x-reverse">
                    <button className="text-white text-2xl">
                        <FaBars />
                    </button>
                </div>
            </nav>
        );
    }

    return (
        <div dir="rtl" className="relative" ref={searchRef}>
            <nav className="bg-green-500 p-4 flex justify-between items-center sticky top-0 z-50">
                {/* Logo */}
                <div className="flex items-center space-x-6">
                    <Link href="/" passHref>
                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center cursor-pointer">
                            <FaMosque className="text-green-500 text-2xl" />
                        </div>
                    </Link>
                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">اقرأ</h2>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white rounded-full px-3 py-1 flex-1 max-w-md mx-2 lg:mx-4">
                    <input
                        type="text"
                        placeholder="ابحث عن مسار أو كورس..."
                        className="border-none outline-none w-full bg-transparent text-gray-800 text-sm sm:text-base"
                        value={query}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        onFocus={() => query.length > 0 && setSearchOpen(true)}
                    />
                    <button type="submit">
                        <FaSearch className="text-gray-500 text-sm sm:text-base" />
                    </button>
                </form>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                    <Link href="/" passHref>
                        <span className="text-white hover:bg-green-600 p-1 lg:p-2 rounded text-sm sm:text-base">الرئيسية</span>
                    </Link>

                    <div className="relative inline-block">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="text-white hover:bg-green-600 p-1 lg:p-2 rounded flex items-center text-sm sm:text-base"
                        >
                            المسارات التعليمية
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 bg-white shadow-lg rounded z-10 mt-2 w-56 lg:w-64 max-h-[70vh] overflow-y-auto">
                                <div className="p-2 border-b border-gray-200 bg-green-100">
                                    <h3 className="font-bold text-green-700">اختر مسارك التعليمي</h3>
                                </div>
                                <ul className="list-none p-2">
                                    {learningPaths.map((path) => (
                                        <li key={path.id} className="py-1 hover:bg-gray-100 rounded transition">
                                            <Link href={`/learning-paths/${path.id}`} passHref>
                                                <div
                                                    className="flex items-center p-2 text-black text-sm cursor-pointer"
                                                    onClick={handlePathClick}
                                                >
                                                    <FaBook className="ml-2 text-green-500" />
                                                    <span className="flex-1">{path.name}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <Link href="/about" passHref>
                        <span className="text-white hover:bg-green-600 p-1 lg:p-2 rounded text-sm sm:text-base">حول</span>
                    </Link>
                    <Link href="/support" passHref>
                        <span className="text-white hover:bg-green-600 p-1 lg:p-2 rounded text-sm sm:text-base">الدعم</span>
                    </Link>
                    <Link href="/contact" passHref>
                        <span className="text-white hover:bg-green-600 p-1 lg:p-2 rounded text-sm sm:text-base">اتصل بنا</span>
                    </Link>

                    {user ? (
                        <div className="flex space-x-2 space-x-reverse items-center">
                            <span className="text-white text-sm sm:text-base">مرحباً، {user.f_name || user.email}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs sm:text-sm"
                            >
                                تسجيل الخروج
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-1 lg:space-x-2 space-x-reverse">
                            <Link href="/login" passHref>
                                <span className="bg-white text-green-600 hover:bg-gray-100 px-2 lg:px-4 py-1 lg:py-2 rounded-full flex items-center text-xs sm:text-sm">
                                    <FaSignInAlt className="ml-1 text-xs sm:text-sm" />
                                    تسجيل الدخول
                                </span>
                            </Link>
                            <Link href="/register" passHref>
                                <span className="bg-green-700 text-white hover:bg-green-800 px-2 lg:px-4 py-1 lg:py-2 rounded-full flex items-center text-xs sm:text-sm">
                                    <FaUser className="ml-1 text-xs sm:text-sm" />
                                    إنشاء حساب
                                </span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4 space-x-reverse">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* نتائج البحث المنبثقة */}
            {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full right-0 left-0 bg-white shadow-lg rounded z-40 mt-1 max-h-60 overflow-y-auto w-full md:max-w-md mx-auto">
                    <ul className="divide-y divide-gray-200">
                        {searchResults.map((result) => (
                            <li key={result.id}>
                                <Link
                                    href={`/learning-paths/${result.id}`}
                                    className="block p-3 hover:bg-gray-100 transition text-right"
                                    onClick={() => setSearchOpen(false)}
                                >
                                    <div className="font-bold text-green-600">{result.name}</div>
                                    <div className="text-sm text-gray-600">{result.description}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* القائمة الجانبية للجوال */}
            {menuOpen && (
                <div className="md:hidden absolute top-full right-0 w-full bg-white shadow-lg z-50 py-4 px-6 space-y-4">
                    <Link href="/" passHref>
                        <span className="block text-green-600 hover:text-green-800 text-lg">الرئيسية</span>
                    </Link>

                    <div>
                        <span className="block text-green-600 font-bold mb-2">المسارات التعليمية</span>
                        <ul className="space-y-2">
                            {learningPaths.map((path) => (
                                <li key={path.id}>
                                    <Link
                                        href={`/learning-paths/${path.id}`}
                                        passHref
                                        onClick={handlePathClick}
                                    >
                                        <span className="block text-gray-800 hover:text-green-600">{path.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link href="/about" passHref>
                        <span className="block text-green-600 hover:text-green-800 text-lg">حول</span>
                    </Link>
                    <Link href="/support" passHref>
                        <span className="block text-green-600 hover:text-green-800 text-lg">الدعم</span>
                    </Link>
                    <Link href="/contact" passHref>
                        <span className="block text-green-600 hover:text-green-800 text-lg">اتصل بنا</span>
                    </Link>

                    {user ? (
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                                    {user.f_name ? user.f_name.charAt(0) : user.email.charAt(0)}
                                </div>
                                <div className="text-sm">
                                    <div className="text-gray-800 font-medium">
                                        {user.f_name || user.email}
                                    </div>
                                    <div className="text-gray-500 text-xs">عضو مسجل</div>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 14a9 9 0 100-18 9 9 0 000 18z" />
                                </svg>
                                تسجيل الخروج
                            </button>
                        </div>
                    ) : (
                        <div className="pt-4 border-t border-gray-200 space-y-2">
                            <Link href="/login" passHref>
                                <span className="block bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded text-sm">تسجيل الدخول</span>
                            </Link>
                            <Link href="/register" passHref>
                                <span className="block bg-gray-200 hover:bg-gray-300 text-green-700 text-center py-2 rounded text-sm">إنشاء حساب</span>
                            </Link>
                        </div>
                    )}
                </div>
            )}


        </div>
    );
};

export default NavbarWithFilter;