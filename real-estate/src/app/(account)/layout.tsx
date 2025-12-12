import React from "react";
import "../globals.css";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import LogoutButton from "@/components/button/LogoutButton";
import NavLinks from "@/components/link/NavLinks";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({children}: DashboardLayoutProps) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/");

    return (
        <section
            dir="rtl"
            className="min-h-screen bg-gray-50 flex justify-center items-center py-10"
        >
            <div
                className="
                flex max-w-7xl w-full mx-auto gap-6
                flex-col lg:flex-row
                px-4 sm:px-6
            "
            >

                <aside
                    className="
                    w-full lg:w-80
                    bg-white rounded-3xl shadow-lg p-8
                    sticky top-6
                    z-10
                    min-h-[220px] lg:h-[400px]
                    flex flex-col
                "
                >
                    <header className="flex items-center gap-4 !mb-6 !pb-4 !p-2 border-b border-gray-100">
                        <div
                            className="w-22 h-16 bg-gradient-to-br from-red-400 to-red-600
                            rounded-full flex items-center justify-center
                            text-white text-2xl font-bold mx-auto lg:mx-0"
                        >
                            س
                        </div>

                        <div className="text-center lg:text-right w-full">
                            <h3 className="text-xl font-bold text-gray-900">{session.user?.name}</h3>
                            <p className="text-gray-500 text-[16px] break-all">{session.user?.email}</p>
                        </div>
                    </header>

                    <nav className="!space-y-3 !px-2">
                        <NavLinks/>
                    </nav>

                    <nav className="!px-2 !mt-auto !mb-3">
                        <LogoutButton/>
                    </nav>
                </aside>

                <main className="flex-1 p-6 mt-2">
                    {children}
                </main>
            </div>
        </section>
    );
}
