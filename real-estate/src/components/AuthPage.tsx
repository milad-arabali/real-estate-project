"use client";

import React, { RefObject, useState } from "react";

interface AuthPageProps {
    formRef: RefObject<HTMLFormElement | null>;
    onClose: () => void;
}

export default function AuthPage({ formRef, onClose }: AuthPageProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!email || !password) {
            setMessage("ایمیل و رمز عبور الزامی هستند!");
            setLoading(false);
            return;
        }

        try {

            if (email === "test@test.com" && password === "123456") {
                setMessage("ورود موفق!");
                setLoading(false);
                onClose();
                return;
            }

            setMessage("ایمیل یا رمز عبور اشتباه است!");
        } catch (err) {
            console.error(err);
            setMessage("خطای غیرمنتظره رخ داد!");
        }

        setLoading(false);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block text-sm mb-1 text-gray-700">ایمیل</label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full border rounded px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm mb-1 text-gray-700">رمز عبور</label>
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="******"
                    className="w-full border rounded px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {message && (
                <p className={`text-sm ${message === "ورود موفق!" ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </p>
            )}

            {loading && <p className="text-blue-600 text-sm">در حال پردازش...</p>}
            <button type="submit" className="hidden">submit</button>
        </form>
    );
}
