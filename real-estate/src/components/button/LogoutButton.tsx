"use client";

import {signOut} from "next-auth/react";
import {LogOut} from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            className="flex items-center gap-4 !m-1 !p-2 w-full rounded-2xl bg-red-50 text-red-600"
            onClick={() => signOut({callbackUrl: "/"})}
        >
            <LogOut size={20}/>
            <span className="font-medium">خروج</span>
        </button>
    );
}
