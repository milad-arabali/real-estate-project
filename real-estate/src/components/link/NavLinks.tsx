"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Heart, Home, ShoppingBag, User} from "lucide-react";

const links = [
    {href: "/my-account/dashboard", label: "داشبورد", icon: <Home size={20}/>},
    {href: "/my-account/add-ads", label: "ثبت آگهی", icon: <Heart size={20}/>},
    {href: "/my-account/my-ads", label: "آگهی های من", icon: <ShoppingBag size={20}/>},
    {href: "/my-account/profile", label: "پروفایل و آدرس", icon: <User size={20}/>},
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="!space-y-3 !px-2">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-4 w-full !m-1 !p-2 rounded-2xl hover:bg-gray-50 ${
                        pathname === link.href ? "bg-blue-50 text-red-600" : "text-gray-700"
                    }`}
                >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                </Link>
            ))}
        </nav>
    );
}
