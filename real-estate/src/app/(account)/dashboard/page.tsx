import {Card, CardContent, CardHeader} from "@/components/ui/card";
import React from "react";
import {CheckCircle, Clock, Eye, Heart, XCircle} from "lucide-react";


export default function Dashboard() {
    return (
        <div className="flex-1 p-6  !my-5">
            <div className="space-y-8">

                <Card className="p-6 !mb-4 shadow-lg border-0 rounded-3xl">

                    <CardHeader className=" !mb-1 !pt-6 !p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                            <h3 className="text-xl font-bold text-gray-900">آخرین بازدید</h3>
                        </div>

                        <div className="flex justify-between items-center !p-6">

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle size={24} className="text-green-600"/>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">1</p>
                                    <p className="text-sm text-gray-600">آگهی های ثبت شده</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Clock size={24} className="text-yellow-600"/>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">2</p>
                                    <p className="text-sm text-gray-600">آگهی های در حال انتشار</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <XCircle size={24} className="text-red-600"/>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">0</p>
                                    <p className="text-sm text-gray-600">آگهی های رد شده</p>
                                </div>
                            </div>

                        </div>
                    </CardHeader>


                    <div className="border-t !pt-6 !p-6">
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                                    <div className="w-16 h-20 bg-gray-300 rounded-lg"></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                                        منزل در تجریش
                                    </h4>
                                    <p className="text-gray-600 mb-2">27 متری، تک خواب</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-red-600">16,704,000</span>
                                        <span className="text-gray-600">تومان</span>
                                        <span className="bg-red-600 text-white !px-2 !py-1 rounded-lg text-sm">
                                            15% تخفیف
                                        </span>
                                    </div>
                                </div>
                                <button className="!p-2 hover:bg-red-100 rounded-full transition-colors">
                                    <Heart size={20} className="text-gray-600 hover:text-red-600"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="!p-6  border-0 rounded-3xl">
                    <CardHeader className="!p-0 !mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                            <h3 className="text-xl font-bold text-gray-900">آخرین آگهی ثبت شده</h3>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="bg-gray-50 rounded-2xl p-4">
                            <div className="flex items-center justify-between ">

                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                                        <div className="w-16 h-20 bg-gray-300 rounded-lg"></div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                                            منزل در تجریش
                                        </h4>
                                        <p className="text-gray-600 mb-2">27 متری، تک خواب</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-red-600">16,704,000</span>
                                            <span className="text-gray-600">تومان</span>
                                            <span className="bg-red-600 text-white !px-2 !py-1 rounded-lg text-sm">
                                            15% تخفیف
                                        </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="!pl-3 flex flex-col gap-2">
                                    <span
                                        className="!px-3 !py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                        در حال انتشار
                                    </span>
                                    <span
                                        className="!px-3 !py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        انتشار شده
                                    </span>
                                </div>

                                <div className=" !pl-3 flex justify-end">
                                    <button
                                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium">
                                        <Eye size={16}/>
                                        <span>مشاهده جزئیات</span>
                                    </button>
                                </div>
                            </div>


                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
