import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import "@/app/globals.css"
import React from "react";
import {Metadata} from "next";
import {headers} from "next/headers";
import UserForm from "@/app/(account)/my-account/profile/user-form";


export const metadata: Metadata = {
    title: "پروفایل و آدرس | داشبورد",
    description: "Manage your profile and account settings",
    openGraph: {
        title: "پروفایل و آدرس | داشبورد",
        url: "http://localhost:3000/todo/profile",
        type: "website",
    },
};

export default async function Profile() {
    const requestHeaders = await headers();
    const cookie = requestHeaders.get("cookie");

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile`, {
        cache: "no-store",
        headers: {
            Cookie: cookie || "",
        },
    });
    if (!res.ok) {
        console.error("Failed to fetch profile:", res.status);
    }

    const data = await res.json();

    return (
        <div className="flex-1">
            <div className="space-y-8">

                <Card className="!p-6 !mb-4 shadow-lg border-0 rounded-3xl">
                    <CardHeader>
                        <CardTitle>پروفایل و آدرس</CardTitle>
                        <CardDescription>
                            اطلاعات حساب کاربری خود را تکمیل نمایید
                        </CardDescription>
                    </CardHeader>
                    <main
                        className="flex flex-col items-center justify-center gap-6  rounded-2xl">

                        <UserForm user={data.user}/>
                    </main>
                </Card>

            </div>
        </div>
    );
}
