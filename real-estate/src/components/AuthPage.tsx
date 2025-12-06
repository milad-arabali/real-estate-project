"use client";

import React, {RefObject, useActionState, useState, useTransition} from "react";
import useSWRMutation from "swr/mutation";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";

interface AuthPageProps {
    formRef: RefObject<HTMLFormElement | null>;
    onClose: () => void;
    initialMode?: "login" | "register";
    onModeChange?: (mode: "login" | "register") => void;
}

interface FormState {
    success: boolean;
    values: { name?: string; email: string; password: string; confirmPassword?: string };
    message: string;
}

async function authRequest(_: string, {arg}: { arg: any }) {
    if (arg.mode === "login") {
        return await signIn("credentials", {
            redirect: false,
            email: arg.email,
            password: arg.password,
        });
    }

    if (arg.mode === "register") {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                name: arg.name,
                email: arg.email,
                password: arg.password,
            }),
        });

        return await res.json();
    }
}

export default function AuthPage({formRef, onClose, initialMode = "login", onModeChange}: AuthPageProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [mode, setMode] = useState<"login" | "register">(initialMode);

    const mutation = useSWRMutation("/api/auth/authRequest", authRequest);

    const initialState: FormState = {
        success: false,
        values: {name: "", email: "", password: "", confirmPassword: ""},
        message: "",
    };

    async function formHandler(prevState: FormState, formData: FormData) {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return {...prevState, success: false, message: "⚠️ لطفا تمام فیلدها را پر کنید!"};
        }

        if (mode === "register") {
            const name = formData.get("name") as string;
            const confirmPassword = formData.get("confirmPassword") as string;

            if (!name) return {...prevState, success: false, message: "⚠️ نام الزامی است!"};
            if (password !== confirmPassword) return {...prevState, success: false, message: "❌ پسوردها یکسان نیستند!"};

            try {
                const res = await mutation.trigger({mode: "register", name, email, password});
                if (res?.error) return {success: false, values: {email, password}, message: "❌ ثبت‌نام انجام نشد!"};
                return {
                    success: true,
                    values: {name: "", email: "", password: "", confirmPassword: ""},
                    message: "✅ ثبت‌نام با موفقیت انجام شد!"
                };
            } catch (_) {
                return {...prevState, success: false, message: "❌ خطایی رخ داد!"};
            }
        }

        try {
            const res = await mutation.trigger({mode: "login", email, password});
            if (res?.error) return {success: false, values: {email, password}, message: "❌ ایمیل یا پسورد اشتباه است!"};
            onClose();
            startTransition(() => router.push("/todo"));
            return {success: true, values: {email: "", password: ""}, message: "✅ ورود موفقیت آمیز بود!"};
        } catch (_) {
            return {...prevState, success: false, message: "❌ خطایی رخ داد!"};
        }
    }

    const [state, formAction] = useActionState(formHandler, initialState);

    const handleGoogleSignIn = () => {
        startTransition(() => {
            signIn("google", {callbackUrl: "/todo"});
            onClose();
        });
    };

    const toggleMode = () => {
        const newMode = mode === "login" ? "register" : "login";
        setMode(newMode);
        onModeChange?.(newMode);
    };

    return (
        <div className="!w-full flex !justify-center">
            <div className="w-full !max-w-[400px] !space-y-6 !mx-auto !mt-10">

                <form ref={formRef} action={formAction} className="space-y-6">
                    <Input
                        type="email"
                        name="email"
                        placeholder=" ایمیل خود را وارد کنید"
                        defaultValue={state.values.email}
                        required
                        className="h-12 text-lg placeholder-gray-400 bg-blue-50
                                   placeholder-opacity-70 placeholder:text-[11px] placeholder: !pr-1
                                   border border-gray-300 rounded-lg px-4
                                   focus:outline-none focus:ring-0 focus:border-2 focus:border-blue-500
                                   transition"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder=" پسورد خود را وارد کنید"
                        defaultValue={state.values.password}
                        required
                        className="h-12 text-lg placeholder-gray-400 bg-blue-50 !mt-5
                                   placeholder-opacity-70 placeholder:text-[11px] placeholder: !pr-1
                                   border border-gray-300 rounded-lg px-4
                                   focus:outline-none focus:ring-0 focus:border-2 focus:border-blue-500
                                   transition"
                    />
                    {mode === "register" && (
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder=" تکرار پسورد"
                            defaultValue={state.values.confirmPassword}
                            required
                            className="h-12 text-lg placeholder-gray-400 bg-blue-50
                            placeholder-opacity-70 placeholder:text-[11px] placeholder: !pr-1
                            border border-gray-300 rounded-lg px-4 !mt-5
                            focus:outline-none focus:ring-0 focus:border-2 focus:border-blue-500
                            transition"
                        />
                    )}
                </form>

                <div className="flex items-center justify-center my-4">
                    <div className="border-t w-1/3"/>
                    <span className="mx-2 text-gray-500 text-sm">or</span>
                    <div className="border-t w-1/3"/>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 py-3
                     bg-white border border-gray-300 rounded-xl
                     disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">
                        {isPending ? "در حال اتصال..." : "ورود با حساب گوگل"}
                    </span>
                </button>

                {state.message && (
                    <p className={`text-center text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
                        {state.message}
                    </p>
                )}

                <p
                    onClick={toggleMode}
                    className="text-center text-blue-600 cursor-pointer text-sm mt-4"
                >
                    {mode === "login"
                        ? "اکانت ندارید؟ ثبت‌نام کنید"
                        : "اکانت دارید؟ وارد شوید"}
                </p>
            </div>
        </div>
    );
}
