"use client";

import {createContext, useContext, useState} from "react";
import AuthModal from "@/components/modal/AuthModalProvider";


interface AuthContextType {
    openModal: () => void;
}

const AuthModalContext = createContext<AuthContextType | null>(null);

export function useAuthModal() {
    const ctx = useContext(AuthModalContext);
    if (!ctx) throw new Error("useAuthModal must be used inside AuthModalProvider");
    return ctx;
}

export default function AuthModalProvider({children}: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);

    return (
        <AuthModalContext.Provider value={{openModal}}>
            {children}
            <AuthModal open={open} onOpenChange={setOpen}/>
        </AuthModalContext.Provider>
    );
}
