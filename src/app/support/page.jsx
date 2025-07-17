"use client";
import { useForm, ValidationError } from "@formspree/react";

export default function SupportPage() {
    const [state, handleSubmit] = useForm("xkgrlbbw");

    if (state.succeeded) {
        return (
            <h1 className="text-3xl font-bold text-green-500 text-center mt-10">
                شكراً على تواصلك! سنرد عليك قريباً.
            </h1>
        );
    }

    return (
        <div className="p-4 max-w-2xl mx-auto" dir="rtl">
            <h1 className="text-3xl font-bold mb-8 text-center text-green-500">صفحة الدعم</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md space-y-6"
            >
                {/* الاسم */}
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        الاسم الكامل:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* البريد الإلكتروني */}
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        البريد الإلكتروني:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                    />
                </div>

                {/* الرسالة */}
                <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                        رسالتك أو استفسارك:
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    ></textarea>
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                    />
                </div>

                {/* زر الإرسال */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={state.submitting}
                        className="bg-green-600 text-white px-8 py-2 rounded-full text-lg hover:bg-green-700 transition"
                    >
                        إرسال
                    </button>
                </div>
            </form>
        </div>
    );
}
