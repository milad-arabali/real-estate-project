"use client";

import React, {useRef} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogOverlay, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import AuthPage from "@/components/AuthPage";


interface Props {
    open: boolean;
    onOpenChange: (v: boolean) => void;
}

export default function AuthModal({open, onOpenChange}: Props) {
    const formRef = useRef<HTMLFormElement>(null);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogOverlay className="fixed inset-0 bg-white/35 backdrop-blur-[2px] z-[9998]"/>

            <DialogContent
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           w-[95%] sm:w-[600px] lg:w-[700px]
                           min-h-[400px] lg:min-h-[400px] max-h-[90vh]
                           flex flex-col rounded-sm
                           bg-white shadow-[0_6px_30px_rgba(0,0,0,0.15)] z-[9999]"
            >

                <DialogHeader
                    className="flex flex-col items-start justify-center h-15 !p-5 !border-b !border-[#dbdbe4]">
                    <DialogTitle className="text-xl  font-bold text-gray-900">
                        ورود به حساب کاربری
                    </DialogTitle>
                </DialogHeader>


                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
                    <AuthPage formRef={formRef} onClose={() => onOpenChange(false)}/>
                </div>

                <DialogFooter className="flex justify-end gap-3 p-10 !border-t !border-[#dbdbe4]">
                    <Button
                        onClick={() => formRef.current?.requestSubmit()}
                        className="flex items-center gap-2 h-[42px] w-20 !p-4 !m-3 !rounded
                                   !bg-[#a62626] hover:!bg-red-700 !text-white"
                    >
                        تایید
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
