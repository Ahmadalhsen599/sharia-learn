"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setpassword_confirmation] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            f_name: firstName,
            l_name: lastName,
            email: email,
            password: password,
            password_confirmation:password_confirmation,
            password_confirmation: password,
            birth_date: birthDate,
            phone_number: phone,
            role: 3,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', data, {
                headers: {
                    'Content-Type': 'application/json',
                     'Accept': 'application/json',
                },
            });

           localStorage.setItem('user', JSON.stringify(response.data.user)); // تأكد من وجود user في response
           localStorage.setItem('token', response.data.token); // افترض أن الاستجابة تحتوي على توكن
            setMessage('تم التسجيل بنجاح!');
          

            // رسالة النجاح
            setTimeout(() => { window.location.href = '/';
                // توجيه المستخدم إلى الصفحة الرئيسية بعد 2 ثانية
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            setMessage('حدث خطأ أثناء التسجيل. حاول مرة أخرى.'); // رسالة الخطأ
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h2>
            {message && <p className="text-center text-green-500 mb-4">{message}</p>} {/* عرض الرسالة */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">الاسم الأول</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">الاسم الأخير</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">البريد الإلكتروني</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">رقم الهاتف</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">تاريخ الميلاد</label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">كلمة السر</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value),setpassword_confirmation(e.target.value)}}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full block text-center bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600"
                >
                    إنشاء حساب
                </button>
            </form>
        </div>
    );
}