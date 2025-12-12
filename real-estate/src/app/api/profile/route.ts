import User from "@/models/users";
import connectDb from "@/utils/connect-db";
import {NextResponse} from "next/server";
import {hashPassword} from "@/utils/auth";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req: Request) {
    try {
        await connectDb();

        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json(
                {error: "کاربر وارد نشده است!"},
                {status: 401}
            );
        }

        const {name, family, email, password, address} = await req.json();

        const updateData: any = {};
        if (name) updateData.name = name;
        if (family) updateData.family = family;
        if (email) updateData.email = email;
        if (address) updateData.address = address;
        if (password) updateData.password = await hashPassword(password);

        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            updateData,
            {new: true}
        ).select("-password");

        return NextResponse.json({
            success: true,
            message: "اطلاعات با موفقیت به‌روزرسانی شد!",
            user: updatedUser,
        });
    } catch (err) {
        console.error("Update User Error:", err);
        return NextResponse.json(
            {error: "خطای سرور! لطفاً مجدداً تلاش کنید."},
            {status: 500}
        );
    }
}

export async function GET(req: Request) {
    try {
        await connectDb();
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                {error: "کاربر وارد نشده است!"},
                {status: 401}
            );
        }

        const email = session.user.email;

        const user = await User.findOne({email}).select("-password");
        if (!user) {
            return NextResponse.json({exists: false});
        }
        return NextResponse.json({exists: true, user});
    } catch (err) {
        console.error("User GET Error:", err);
        return NextResponse.json(
            {error: "خطای سرور! لطفاً مجدداً تلاش کنید."},
            {status: 500}
        );
    }
}
