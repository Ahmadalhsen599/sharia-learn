"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setpassword_confirmation] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
            password_confirmation: password,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                     'Accept': 'application/json',
                },
            });

            // تخزين رمز التوثيق أو بيانات المستخدم في localStorage
            localStorage.setItem('token', response.data.token); // افترض أن الاستجابة تحتوي على توكن
            localStorage.setItem('user', JSON.stringify(response.data.user)); // افترض أن هناك بيانات مستخدم


            setMessage('تم تسجيل الدخول بنجاح!');
          

            // رسالة النجاح
            setTimeout(() => {  window.location.href = '/';
                // توجيه المستخدم إلى الصفحة الرئيسية بعد 2 ثانية
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            setMessage('بيانات تسجيل الدخول غير صحيحة.'); // رسالة الخطأ
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>
            {message && <p className="text-center text-red-500 mb-4">{message}</p>} {/* عرض الرسالة */}
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
                        onChange={(e) => { setPassword(e.target.value), setpassword_confirmation(e.target.value) }}
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