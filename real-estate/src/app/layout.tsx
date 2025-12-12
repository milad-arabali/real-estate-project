import "./globals.css";
import React from "react";
import {ToastContainer} from "react-toastify";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="fa">
        <body>
        {children}
        <ToastContainer position="top-center" />
        </body>
        </html>
    );
}
