'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaMosque, FaBars, FaTimes, FaSearch, FaUser, FaSignInAlt } from "react-icons/fa";
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
                    {
                        id: 'hifz',
                        title: 'تحفيظ القرآن',
                        description: 'مسار متكامل لحفظ القرآن الكريم بطريقة سهلة ومنهجية',
                        image_url: '/images/hifz.jpg',
                        course_number: 5,
                    },
                    {
                        id: 'tafsir',
                        title: 'تفسير القرآن',
                        description: 'فهم معاني وتفسير آيات القرآن الكريم',
                        image_url: '/images/tafsir.jpg',
                        course_number: 3,
                    },
                    {
                        id: 'tajweed',
                        title: 'تجويد القرآن',
                        description: 'تعلم قواعد وأحكام التلاوة والتجويد',
                        image_url: '/images/tajweed.jpg',
                        course_number: 4,
                    }
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
                (path.title?.toLowerCase() || '').includes(value.toLowerCase()) ||
                (path.description?.toLowerCase() || '').includes(value.toLowerCase())
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
                        onChange={(e) => handleQueryChange(e.target.value)}
                        onFocus={() => query.length > 0 && setSearchOpen(true)}
                    />
                    <button type="submit">
                        <FaSearch className="text-gray-500 text-sm sm:text-base" />
                    </button>
                </form>

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
                            <div className="absolute right-0 bg-white shadow-lg rounded z-10 mt-2 w-80 max-h-[70vh] overflow-y-auto">
                                <div className="p-2 border-b border-gray-200 bg-green-100">
                                    <h3 className="font-bold text-green-700">اختر مسارك التعليمي</h3>
                                </div>
                                <ul className="list-none p-2 space-y-2">
                                    {learningPaths.map((path) => (
                                        <li key={path.id}>
                                            <Link href={`/learning-paths/${path.id}`} passHref>
                                                <div
                                                    className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition cursor-pointer"
                                                    onClick={handlePathClick}
                                                >
                                                    <img src={path.image_url} alt={path.title} className="w-12 h-12 rounded object-cover border" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-semibold text-green-700">{path.title}</div>
                                                        <div className="text-xs text-gray-500 line-clamp-2">{path.description}</div>
                                                        <div className="text-[11px] text-gray-400 mt-0.5">عدد الكورسات: {path.course_number}</div>
                                                    </div>
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
            </nav>

            {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full right-0 left-0 bg-white shadow-lg rounded z-40 mt-1 max-h-60 overflow-y-auto w-full md:max-w-md mx-auto">
                    <ul className="divide-y divide-gray-200">
                        {searchResults.map((result) => (
                            <li key={result.id}>
                                <Link
                                    href={`/learning-paths/${result.id}`}
                                    className="flex p-3 hover:bg-gray-100 transition text-right items-start gap-3"
                                    onClick={() => setSearchOpen(false)}
                                >
                                    <img src={result.image_url} alt={result.title} className="w-12 h-12 rounded object-cover border" />
                                    <div className="flex-1">
                                        <div className="font-bold text-green-600">{result.title}</div>
                                        <div className="text-sm text-gray-600 line-clamp-2">{result.description}</div>
                                        <div className="text-[11px] text-gray-400 mt-1">عدد الكورسات: {result.course_number}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavbarWithFilter;
