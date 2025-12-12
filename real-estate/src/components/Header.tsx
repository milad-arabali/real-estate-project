
import SearchBox from "./SearchBox";
import AuthButtons from "./button/AuthButtons";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Header() {
    const session = await getServerSession(authOptions);

    return (
        <header className="bg-blue-600 dark:bg-blue-500 rounded-md !mt-1 !w-full !max-w-[1200px] !mx-auto">
            <div className="container mx-auto flex flex-wrap items-center justify-between !p-2 gap-4 ">

                <nav className="flex items-center gap-6 flex-shrink-0">
                    <Link href="/" className="!text-white/80 hover:text-white font-medium">
                        صفحه اصلی
                    </Link>
                    <Link href="/ads" className="!text-white/80 hover:text-white font-medium">
                        آگهی‌ها
                    </Link>
                </nav>

                <div className="flex-1 min-w-[250px] max-w-lg">
                    <SearchBox />
                </div>

                <AuthButtons session={session} />
            </div>
        </header>
    );
}
