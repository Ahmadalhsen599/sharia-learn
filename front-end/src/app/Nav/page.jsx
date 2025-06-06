"use client";
import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const fetchLearningPaths = async () => {
            try {
                // بيانات ثابتة بدلاً من API (يمكن استبدالها بطلب API لاحقاً)
                const mockData = [
                    {
                        id: 'hifz',
                        name: 'تحفيظ القرآن',
                        description: 'مسار متكامل لحفظ القرآن الكريم'
                    },
                    {
                        id: 'tafsir',
                        name: 'تفسير القرآن',
                        description: 'فهم معاني القرآن الكريم'
                    },
                    {
                        id: 'tajweed',
                        name: 'تجويد القرآن',
                        description: 'تعلم أحكام التلاوة الصحيحة'
                    }
                ];
                setLearningPaths(mockData);
            } catch (error) {
                console.error('Error fetching learning paths:', error);
            }
        };

        fetchLearningPaths();
        setIsMounted(true);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setQuery('');
            setSearchOpen(false);
        }
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
        <div dir="rtl" className="relative">
            <nav className="bg-green-500 p-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center space-x-6">
                    <Link href="/" passHref>
                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center cursor-pointer">
                            <FaMosque className="text-green-500 text-2xl" />
                        </div>
                    </Link>
                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">اقرأ</h2>
                </div>

                <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white rounded-full px-3 py-1 flex-1 max-w-md mx-2 lg:mx-4">
                    <input
                        type="text"
                        placeholder="ابحث عن مسار أو كورس..."
                        className="border-none outline-none w-full bg-transparent text-gray-800 text-sm sm:text-base"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (e.target.value.length > 0) {
                                const results = learningPaths.filter(path =>
                                    path.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                                    path.description.toLowerCase().includes(e.target.value.toLowerCase())
                                );
                                setSearchResults(results);
                                setSearchOpen(true);
                            } else {
                                setSearchOpen(false);
                            }
                        }}
                        onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                    />
                    <button type="submit">
                        <FaSearch className="text-gray-500 text-sm sm:text-base" />
                    </button>
                </form>

                <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                    <Link href="/" passHref>
                        <span className="text-white hover:bg-green-600 p-1 lg:p-2 rounded text-sm sm:text-base">
                            الرئيسية
                        </span>
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
                        <span className="text-white hover:bg-green-600 p-1 lg:p-2 rounded text-sm sm:text-base">
                            حول
                        </span>
                    </Link>
                    <Link href="/support" passHref>
                        <span className="text-white hover:bg-green-600 p-1 lg:p-2 rounded text-sm sm:text-base">
                            الدعم
                        </span>
                    </Link>
                    <Link href="/contact" passHref>
                        <span className="text-white hover:bg-green-600 p-1 lg:p-2 rounded text-sm sm:text-base">
                            اتصل بنا
                        </span>
                    </Link>

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
                </div>

                <div className="md:hidden flex items-center space-x-4 space-x-reverse">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <Link href="/login" passHref>
                        <span className="text-white text-xl">
                            <FaSignInAlt />
                        </span>
                    </Link>
                </div>
            </nav>

            {/* القائمة المتنقلة */}
            {menuOpen && (
                <div className="bg-green-600 md:hidden fixed w-full z-40">
                    <div className="p-4">
                        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-4 py-2">
                            <input
                                type="text"
                                placeholder="ابحث عن مسار..."
                                className="border-none outline-none w-full bg-transparent text-gray-800"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    if (e.target.value.length > 0) {
                                        const results = learningPaths.filter(path =>
                                            path.name.toLowerCase().includes(e.target.value.toLowerCase())
                                        );
                                        setSearchResults(results);
                                        setSearchOpen(true);
                                    } else {
                                        setSearchOpen(false);
                                    }
                                }}
                            />
                            <button type="submit">
                                <FaSearch className="text-gray-500" />
                            </button>
                        </form>
                    </div>

                    <Link href="/" passHref>
                        <span className="block text-white py-3 px-4 hover:bg-green-700" onClick={() => setMenuOpen(false)}>
                            الرئيسية
                        </span>
                    </Link>

                    <div className="px-4 py-2">
                        <div className="text-white font-medium py-2 border-b border-green-500">المسارات التعليمية</div>
                        <div className="pl-4">
                            {learningPaths.map((path) => (
                                <Link key={path.id} href={`/learning-paths/${path.id}`} passHref>
                                    <div 
                                        className="flex items-center text-white py-2 hover:bg-green-700 rounded px-2"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FaBook className="ml-2" />
                                        <span>{path.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/about" passHref>
                        <span className="block text-white py-3 px-4 hover:bg-green-700" onClick={() => setMenuOpen(false)}>
                            حول
                        </span>
                    </Link>
                    <Link href="/support" passHref>
                        <span className="block text-white py-3 px-4 hover:bg-green-700" onClick={() => setMenuOpen(false)}>
                            الدعم
                        </span>
                    </Link>
                    <Link href="/contact" passHref>
                        <span className="block text-white py-3 px-4 hover:bg-green-700" onClick={() => setMenuOpen(false)}>
                            اتصل بنا
                        </span>
                    </Link>

                    <div className="p-4 border-t border-green-500">
                        <Link href="/register" passHref>
                            <span className="block bg-green-700 text-white text-center hover:bg-green-800 px-4 py-2 rounded-full mb-3 text-sm" onClick={() => setMenuOpen(false)}>
                                إنشاء حساب
                            </span>
                        </Link>
                        <Link href="/login" passHref>
                            <span className="block bg-white text-green-600 text-center hover:bg-gray-100 px-4 py-2 rounded-full text-sm" onClick={() => setMenuOpen(false)}>
                                تسجيل الدخول
                            </span>
                        </Link>
                    </div>
                </div>
            )}

            {/* نتائج البحث */}
            {searchOpen && (
                <div className="fixed md:absolute top-20 md:top-16 left-0 right-0 md:left-auto md:right-1/4 bg-white rounded shadow-lg z-30 mx-4 md:mx-0 md:w-1/2 max-h-[60vh] overflow-y-auto">
                    <div className="p-3 border-b border-gray-200 bg-gray-50">
                        <h3 className="font-bold">نتائج البحث عن "{query}"</h3>
                    </div>
                    <ul className="list-none">
                        {searchResults.length > 0 ? (
                            searchResults.map((path) => (
                                <li key={path.id} className="border-b border-gray-100 last:border-0">
                                    <Link href={`/learning-paths/${path.id}`} passHref>
                                        <div 
                                            className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                setQuery('');
                                                setSearchOpen(false);
                                                setMenuOpen(false);
                                            }}
                                        >
                                            <FaBook className="ml-2 text-green-500" />
                                            <span className="flex-1">{path.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="p-3 text-gray-500">لا توجد نتائج مطابقة</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavbarWithFilter;