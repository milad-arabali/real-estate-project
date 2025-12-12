"use client";

import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";

export default function SearchBox() {
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        console.log("Search:", search);
    };

    return (
        <InputGroup className="bg-white rounded-md overflow-hidden">
            <InputGroupInput
                placeholder="جستجو در آگهی‌ها..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent"
            />

            <InputGroupAddon className="cursor-pointer bg-transparent" onClick={handleSearch}>
                <Search className="w-5 h-5 text-gray-600 !mx-2" />
            </InputGroupAddon>

            <InputGroupAddon className="text-gray-500 text-sm !mx-2 bg-transparent" align="inline-end">
                12 نتیجه
            </InputGroupAddon>
        </InputGroup>
    );
}
