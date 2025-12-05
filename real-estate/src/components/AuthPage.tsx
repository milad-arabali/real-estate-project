"use client";

import React, {RefObject, useActionState, useTransition} from "react";
import useSWRMutation from "swr/mutation";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";

interface AuthPageProps {
    formRef: RefObject<HTMLFormElement | null>;
    onClose: () => void;
}

interface FormState {
    success: boolean;
    values: { email: string; password: string };
    message: string;
}


async function loginRequest(
    _: string,
    {arg}: { arg: { email: string; password: string } }
) {
    return await signIn("credentials", {
        redirect: false,
        email: arg.email,
        password: arg.password,
    });
}

export default function AuthPage({formRef, onClose}: AuthPageProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const mutation = useSWRMutation("/api/auth/signin", loginRequest);

    const initialState = {
        success: false,
        values: {email: "", password: ""},
        message: "",
    };

    async function formHandler(prevState: FormState, formData: FormData) {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return {
                ...prevState,
                success: false,
                message: "⚠️ Please fill in all fields!",
            };
        }

        try {
            const res = await mutation.trigger({email, password});

            if (res?.error) {
                return {
                    success: false,
                    values: {email, password},
                    message: "❌ Incorrect email or password!",
                };
            }

            onClose();
            startTransition(() => router.push("/todo"));

            return {
                success: true,
                values: {email: "", password: ""},
                message: "✅ Login successful!",
            };
        } catch (error) {
            return {
                ...prevState,
                success: false,
                message: "❌ An error occurred!",
            };
        }
    }

    const [state, formAction] = useActionState(formHandler, initialState);
    const handleGoogleSignIn = () => {
        startTransition(() => {
            signIn("google", {callbackUrl: "/todo"}).then();
            onClose();
        });
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
                                    border border-gray-300 rounded-lg px-4
                                    focus:outline-none focus:ring-0 focus:border-2 focus:border-blue-500
                                    transition"
                    />

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
                     bg-white border border-gray-300 rounded-xl hover:bg-gray-50
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
                    <p
                        className={`text-center text-sm ${
                            state.success ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {state.message}
                    </p>
                )}
            </div>
        </div>


    );
}
