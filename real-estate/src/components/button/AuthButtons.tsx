"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useAuthModal} from "@/context/ AuthModalContext";
import {LayoutDashboard} from "lucide-react";

export default function AuthButtons({session}: any) {
    const {openModal} = useAuthModal();

    return (
        <div className="flex items-center gap-4 flex-shrink-0">
            {!session ? (
                <Button
                    onClick={openModal}
                    className="bg-white text-blue-700 hover:bg-blue-100 !p-4"
                >
                    ورود / ثبت نام
                </Button>
            ) : (
                <>
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-100 !p-2 rounded-md"
                    >
                        <LayoutDashboard className="w-5 h-5"/>
                        داشبورد
                    </Link>


                </>
            )}
        </div>
    );
}
