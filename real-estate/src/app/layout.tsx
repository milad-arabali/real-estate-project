import "./globals.css";
import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "This is home page",
    keywords: ["nextjs", "typescript", "seo"],
    robots: {
        index: true,
        follow: true,
    },
    viewport: "width=device-width, initial-scale=1",
    authors: [{name: "Milad", url: "https://example.com"}],
    openGraph: {
        title: "Home OG Title",
        description: "OG Description",
        url: "https://example.com",
        siteName: "MySite",
        locale: "fa_IR",
        type: "website",
    },
};


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="fa" >
        <body>{children}</body>
        </html>
    );
}
