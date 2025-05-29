"use client";
import { useForm, ValidationError } from "@formspree/react";

export default function SupportPage() {
    const [state, handleSubmit] = useForm("xkgrlbbw");

if (state.succeeded) {
    return (
        <h1 className="text-3xl font-bold text-green-500 text-center mt-6">
            شكراً على تواصلك!
        </h1>
    );
}
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-500">صفحة الدعم</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">اسمك:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">بريدك الإلكتروني:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700">استفسارك أو شكواك:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                    ></textarea>
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                    />
                </div>

                <div className="text-center">
                    <button type="submit"   disabled={state.submitting} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        إرسال
                    </button>
                </div>
            </form>
        </div>
    );
}