"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function Navbar(){
    return (
        <>
            <nav className="relative z-50 w-full border-b bg-[#0F1220] border-[#88C1D1]/40">
                <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={"/"} className="flex items-center gap-2 text-white font-bold text-base sm:text-lg cursor-pointer">
                        <Shield className="w-5 h-5 sm:h-6 sm:w-6 text-[#88C1D1]"/>
                        <span>CekFail</span>
                    </Link>
                    <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-md text-[#AEAEAE] font-extralight">
                        <Link href={"/"} className="hover:text-white transition">Home</Link>
                        <Link href={"/about"} className="hover:text-white transition">About</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}