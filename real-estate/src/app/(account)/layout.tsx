import React from "react";
import "../globals.css";
import {Heart, Home, LogOut, ShoppingBag, User} from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <section
            dir="rtl"
            className="min-h-screen bg-gray-50 flex justify-center items-center py-10"
        >
            <div className="flex max-w-7xl w-full mx-auto gap-6">

                <aside
                    className="w-80 bg-white rounded-3xl shadow-lg p-8 sticky top-6
               min-h-[600px] flex flex-col"
                >

                    <header className="flex items-center gap-4 !mb-6 !pb-4 !p-2 border-b border-gray-100">
                        <div
                            className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full
            flex items-center justify-center text-white text-2xl font-bold"
                        >
                            س
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">ساحل محمدی</h3>
                            <p className="text-gray-500 text-[16px]">a@gmail.com</p>
                        </div>
                    </header>

                    <nav className="!space-y-3 !px-2">
                        <Link href="/dashboard"
                              className="flex items-center gap-4 w-full !m-1 !p-2 rounded-2xl bg-red-50 text-red-600">
                            <Home size={20}/>
                            <span className="font-medium">داشبورد</span>
                        </Link>

                        <Link href="/add-ads"
                              className="flex items-center gap-4 w-full !m-1 !p-2 rounded-2xl text-gray-700 hover:bg-gray-50">
                            <Heart size={20}/>
                            <span className="font-medium">ثبت آگهی</span>
                        </Link>

                        <Link href="/my-ads"
                              className="flex items-center gap-4 w-full !m-1 !p-2 rounded-2xl text-gray-700 hover:bg-gray-50">
                            <ShoppingBag size={20}/>
                            <span className="font-medium">آگهی های من</span>
                        </Link>

                        <Link href="/profile"
                              className="flex items-center gap-4 w-full !m-1 !p-2 rounded-2xl text-gray-700 hover:bg-gray-50">
                            <User size={20}/>
                            <span className="font-medium">پروفایل و آدرس</span>
                        </Link>
                    </nav>

                    <nav className="!px-2 !mt-auto !mb-3">
                        <button className="flex items-center gap-4 !m-1 !p-2 w-full rounded-2xl bg-red-50 text-red-600">
                            <LogOut size={20}/>
                            <span className="font-medium">خروج</span>
                        </button>
                    </nav>

                </aside>

                <main className="flex-1  p-6  mt-2">
                    {children}
                </main>

            </div>
        </section>
    );
}
