import "./globals.css";
import React from "react";
import {Metadata} from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "خرید و فروش املاک | سایت آگهی املاک",
    description: "آگهی‌های فروش و اجاره املاک در سراسر کشور. خانه، آپارتمان، زمین و مغازه را به راحتی پیدا و آگهی کنید.",
    keywords: [
        "املاک",
        "فروش خانه",
        "اجاره خانه",
        "آگهی املاک",
        "خرید آپارتمان",
        "زمین",
        "مغازه"
    ],
    robots: {
        index: true,
        follow: true,
    },
    viewport: "width=device-width, initial-scale=1",
    authors: [
        {name: "Milad", url: "https://example.com"}
    ],
    openGraph: {
        title: "آگهی املاک | خرید و فروش خانه، آپارتمان و زمین",
        description: "بهترین سایت برای مشاهده و ثبت آگهی املاک در سراسر کشور. خانه، آپارتمان، زمین و مغازه را سریع پیدا کنید.",
        url: "https://example.com",
        siteName: "آگهی املاک",
        locale: "fa_IR",
        type: "website",
        images: [
            {
                url: "https://example.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "آگهی املاک"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        site: "@example",
        title: "آگهی املاک | خرید و فروش خانه و آپارتمان",
        description: "سریع‌ترین روش پیدا کردن و ثبت آگهی املاک در ایران",
        images: ["https://example.com/og-image.jpg"]
    }
};


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="fa">

        <body className="min-h-screen flex flex-col">
        <Header/>
        <main className="flex-1">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
