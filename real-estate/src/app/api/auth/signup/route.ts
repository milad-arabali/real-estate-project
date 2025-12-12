import {NextResponse} from "next/server";
import User from "@/models/users";
import connectDb from "@/utils/connect-db";

export async function POST(req: Request) {
    try {
        await connectDb();

        const {email, password} = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                {error: "ایمیل و پسورد الزامی هستند!"},
                {status: 400}
            );
        }

        const exists = await User.findOne({email});
        if (exists) {
            return NextResponse.json(
                {error: "این ایمیل قبلاً ثبت شده است!"},
                {status: 409}
            );
        }

        await User.create({
            email,
            password,
            name: "",
            family: "",
            address: "",
        });

        return NextResponse.json({
            success: true,
            message: "ثبت ‌نام با موفقیت انجام شد!",
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return NextResponse.json(
            {error: "خطای سرور! لطفاً مجدداً تلاش کنید."},
            {status: 500}
        );
    }
}
