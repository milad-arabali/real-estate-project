'use client'

import {useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Search} from "lucide-react";

const Header = () => {
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        console.log("Search:", search);
    };

    return (
        <header className="bg-blue-600 dark:bg-blue-500 rounded-md !mt-1">
            <div className="container mx-auto flex flex-wrap items-center justify-between !p-2 gap-4 ">

                <nav className="flex items-center gap-6 flex-shrink-0" aria-label="Main navigation">
                    <Link href="/" className="!text-white/80 hover:text-white  font-medium">
                        صفحه اصلی
                    </Link>
                    <Link href="/ads" className="!text-white/80 hover:text-white  font-medium">
                        آگهی‌ها
                    </Link>
                </nav>

                <section className="flex-1 min-w-[250px] max-w-lg">
                    <InputGroup className="bg-white rounded-md overflow-hidden">
                        <InputGroupInput
                            placeholder="جستجو در آگهی‌ها..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent"
                        />
                        <InputGroupAddon
                            className="cursor-pointer bg-transparent"
                            onClick={handleSearch}
                        >
                            <Search className="w-5 h-5 text-gray-600 !mx-2 "/>
                        </InputGroupAddon>
                        <InputGroupAddon
                            className="text-gray-500 text-sm !mx-2 bg-transparent"
                            align="inline-end"
                        >
                            12 نتیجه
                        </InputGroupAddon>
                    </InputGroup>

                </section>

                <div className="flex items-center gap-4 flex-shrink-0">
                    <Button className="bg-white text-blue-700 hover:bg-blue-100 !p-4">
                        ورود
                    </Button>
                </div>

            </div>
        </header>


    );
};

export default Header;
