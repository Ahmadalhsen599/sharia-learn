"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // هنا يمكنك إضافة منطق تسجيل الدخول
        console.log({ email, password });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">البريد الإلكتروني</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">كلمة السر</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600"
                >
                    تسجيل الدخول
                </button>
                
            </form>
        </div>
    );
}