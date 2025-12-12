"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Heart, Home, ShoppingBag, User} from "lucide-react";
import {NativeSelect, NativeSelectOption,} from "@/components/ui/native-select";

const links = [
    {href: "/my-account/dashboard", label: "داشبورد", icon: <Home size={20}/>},
    {href: "/my-account/add-ads", label: "ثبت آگهی", icon: <Heart size={20}/>},
    {href: "/my-account/my-ads", label: "آگهی های من", icon: <ShoppingBag size={20}/>},
    {href: "/my-account/profile", label: "پروفایل و آدرس", icon: <User size={20}/>},
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="w-full lg:w-auto">
            <nav className="hidden lg:flex flex-col !space-y-3 !px-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-4 w-full !m-1 !p-2 rounded-2xl hover:bg-gray-50 transition-colors ${
                            pathname === link.href ? "bg-blue-50 text-red-600" : "text-gray-700"
                        }`}
                    >
                        {link.icon}
                        <span className="font-medium">{link.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="lg:hidden !w-full !mb-4 !px-2">
                <div className="lg:hidden w-full mb-4 px-2">
                    <NativeSelect
                        className="w-full"
                        value={pathname}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value) window.location.href = value;
                        }}
                    >
                        <NativeSelectOption value="">منو</NativeSelectOption>
                        {links.map((link) => (
                            <NativeSelectOption
                                className="!px-4 !py-2 "
                                key={link.href} value={link.href}>

                                {link.label}
                            </NativeSelectOption>
                        ))}
                    </NativeSelect>
                </div>


            </div>
        </div>
    );
}
