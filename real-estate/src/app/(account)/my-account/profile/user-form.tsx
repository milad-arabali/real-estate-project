"use client";

import {useActionState} from "react";
import {toast} from "react-toastify";

interface UserType {
    email: string;
    name: string;
    family: string;
    address: string;
}

interface UserFormState extends UserType {
    password: string;
}

export default function UserForm({user}: { user: UserType }) {

    async function formHandler(
        prevState: { values: UserFormState },
        formData: FormData
    ) {
        const values: UserFormState = {
            email: user.email,
            name: formData.get("name") as string,
            family: formData.get("family") as string,
            address: formData.get("address") as string,
            password: formData.get("password") as string,
        };

        try {
            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("بروزرسانی با موفقیت انجام شد");
            } else {
                toast.error(data.error || "خطا در بروزرسانی");
            }

            return {values};
        } catch (err) {
            toast.error("خطای ناشناخته رخ داد!");
            return {values};
        }
    }

    const [state, formAction] = useActionState(formHandler, {
        values: {
            email: user.email,
            name: user.name,
            family: user.family,
            address: user.address,
            password: "",
        },
    });

    const fields = [
        {name: "email", label: "ایمیل", readOnly: true},
        {name: "name", label: "نام"},
        {name: "family", label: "نام خانوادگی"},
        {name: "address", label: "آدرس"},
        {name: "password", label: "پسورد جدید", type: "password"},
    ];

    return (
        <form action={formAction} className="flex flex-col gap-4 w-full">

            {fields.map((field) => (
                <div key={field.name}>
                    <label className="text-sm text-gray-500 dark:text-gray-300 mb-1 block">
                        {field.label}
                    </label>

                    <input
                        name={field.name}
                        type={field.type || "text"}
                        defaultValue={state.values[field.name as keyof UserFormState]}
                        readOnly={field.readOnly}
                        className={`!p-2 border rounded-md w-full dark:text-gray-200 ${
                            field.readOnly
                                ? "bg-gray-200 dark:bg-gray-800 opacity-60 cursor-not-allowed"
                                : "bg-gray-100 dark:bg-gray-900"
                        }`}
                    />
                </div>
            ))}

            <button
                type="submit"
                className="!mt-2 !py-2 w-[200px] bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
                ذخیره
            </button>
        </form>
    );
}
