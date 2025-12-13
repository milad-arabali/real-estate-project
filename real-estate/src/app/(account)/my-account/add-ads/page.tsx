"use client";

import React, {useActionState, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {toast} from "react-toastify";


type AdsFormData = {
    title: string;
    description: string;
    location: string;
    phone: string;
    price: number | "";
    realState: string;
    constructionDate: Date;
    category: string;
    rules: string[];
    amenities: string[];
};

type ActionState = {
    success: boolean;
    message: string;
};


export default function AddAds() {
    /* ---------- Main Ads State (ID Based) ---------- */
    const [profileData, setProfileData] = useState<AdsFormData>({
        title: "",
        description: "",
        location: "",
        phone: "",
        price: "",
        realState: "",
        constructionDate: new Date(),
        category: "",
        rules: [],
        amenities: [],
    });


    const [state, formAction] = useActionState<ActionState, FormData>(
        formHandler,
        {success: false, message: ""}
    );


    async function formHandler(
        prevState: ActionState,
        formData: FormData
    ): Promise<ActionState> {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const location = formData.get("location") as string;
        const phone = formData.get("phone") as string;
        const price = Number(formData.get("price"));
        const images = formData.get("images") as File;

        if (!title || !description || !location || !phone || !price || !images) {
            toast.error("همه فیلدها الزامی هستند ⚠️");
            return prevState;
        }

        try {
            const dataToSend = new FormData();

            dataToSend.append("title", title);
            dataToSend.append("description", description);
            dataToSend.append("location", location);
            dataToSend.append("phone", phone);
            dataToSend.append("price", String(price));
            dataToSend.append("images", images);

            /* 👇 اینا از کامپوننت جدا میان */
            dataToSend.append("category", profileData.category);
            dataToSend.append("rules", JSON.stringify(profileData.rules));
            dataToSend.append("amenities", JSON.stringify(profileData.amenities));
            dataToSend.append("realState", profileData.realState);
            dataToSend.append(
                "constructionDate",
                profileData.constructionDate.toISOString()
            );

            toast.success("آگهی با موفقیت ثبت شد ✅");

            setProfileData((prev) => ({
                ...prev,
                title: "",
                description: "",
                location: "",
                phone: "",
                price: "",
            }));

            return {success: true, message: "success"};
        } catch (error) {
            toast.error("خطایی رخ داده است ❌");
            return prevState;
        }
    }


    return (
        <div className="flex-1 p-6 my-5">
            <Card className="!p-6 shadow-lg border-0 rounded-3xl">
                <CardHeader>
                    <CardTitle>ثبت آگهی</CardTitle>
                    <CardDescription>
                        اطلاعات اصلی آگهی را وارد کنید
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={formAction} className="flex flex-col gap-4">


                        <div className="grid gap-2">
                            <Label htmlFor="title">عنوان</Label>
                            <input
                                id="title"
                                name="title"
                                value={profileData.title}
                                onChange={(e) =>
                                    setProfileData({...profileData, title: e.target.value})
                                }
                                className="bg-[#dbdbe4] rounded px-4 !py-1"
                            />
                        </div>


                        <div className="grid gap-2">
                            <Label htmlFor="description">توضیحات</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={profileData.description}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        description: e.target.value,
                                    })
                                }
                                className="bg-[#dbdbe4] rounded px-4 h-32 resize-none"
                            />
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                            <div className="grid gap-2">
                                <Label htmlFor="location">موقعیت</Label>
                                <input
                                    id="location"
                                    name="location"
                                    value={profileData.location}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            location: e.target.value,
                                        })
                                    }
                                    className="bg-[#dbdbe4] rounded px-4 !py-1"
                                />
                            </div>


                            <div className="grid gap-2">
                                <Label htmlFor="phone">شماره تماس</Label>
                                <input
                                    id="phone"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="bg-[#dbdbe4] rounded px-4 !py-1"
                                />
                            </div>

                        </div>


                        <div className="grid gap-2">
                            <Label htmlFor="price">قیمت</Label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                value={profileData.price}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        price: Number(e.target.value),
                                    })
                                }
                                className="bg-[#dbdbe4] rounded px-4 !py-1"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="images">عکس</Label>
                            <input id="images" type="file" name="images"/>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className="w-64 bg-emerald-600 rounded-xl"
                            >
                                ثبت آگهی
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
