"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMosque, FaBars, FaTimes, FaSearch, FaUser, FaSignInAlt } from "react-icons/fa";

const NavbarWithFilter = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [query, setQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        setIsMounted(true);
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses'); // استدعاء API
                const data = await response.json();
                setCoursesData(data); // تعيين البيانات المستلمة
            } catch (error) {
                console.error("خطأ في جلب البيانات:", error);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = coursesData.filter(course =>
        course.name.toLowerCase().includes(query.toLowerCase())
    );

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
        <div dir="rtl">
            <nav className="bg-green-500 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <Link href="/" passHref>
                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center cursor-pointer">
                            <FaMosque className="text-green-500 text-2xl" />
                        </div>
                    </Link>
                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">اقرأ</h2>
                </div>

                <div className="hidden md:flex items-center bg-white rounded-full px-3 py-1 flex-1 max-w-md mx-2 lg:mx-4">
                    <input
                        type="text"
                        placeholder="ابحث..."
                        className="border-none outline-none w-full bg-transparent text-gray-800 text-sm sm:text-base"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <FaSearch className="text-gray-500 text-sm sm:text-base" />
                </div>

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
                            <div className="absolute right-0 bg-white shadow-lg rounded z-10 mt-2 w-56 lg:w-64">
                                <div className="p-2 border-b">
                                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                                        <input
                                            type="text"
                                            placeholder="ابحث..."
                                            className="border-none outline-none w-full bg-transparent text-gray-800 text-xs sm:text-sm"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                        <FaSearch className="text-gray-500 text-xs sm:text-sm" />
                                    </div>
                                </div>
                                <ul className="list-none p-2 max-h-60 overflow-y-auto">
                                    {filteredCourses.map((course, index) => (
                                        <li key={index} className="py-1 hover:bg-gray-200 rounded">
                                            <Link href={course.link} passHref>
                                                <span className="block p-2 text-black text-sm">
                                                    {course.name}
                                                </span>
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

            {menuOpen && (
                <div className="bg-green-600 md:hidden">
                    <div className="p-4">
                        <div className="flex items-center bg-white rounded-full px-4 py-2">
                            <input
                                type="text"
                                placeholder="ابحث عن دورة..."
                                className="border-none outline-none w-full bg-transparent text-gray-800"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <FaSearch className="text-gray-500" />
                        </div>
                    </div>

                    <Link href="/" passHref>
                        <span className="block text-white py-3 px-4 hover:bg-green-700" onClick={() => setMenuOpen(false)}>
                            الرئيسية
                        </span>
                    </Link>

                    <div className="px-4 py-2">
                        <div className="text-white font-medium py-2 border-b border-green-500">المسارات التعليمية</div>
                        <div className="pl-4">
                            {filteredCourses.map((course, index) => (
                                <Link key={index} href={course.link} passHref>
                                    <span 
                                        className="block text-white py-2 hover:bg-green-700 rounded px-2"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {course.name}
                                    </span>
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
        </div>
    );
};

export default NavbarWithFilter;