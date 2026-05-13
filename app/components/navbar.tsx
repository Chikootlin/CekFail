"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function Navbar(){
    return (
        <>
            <nav className="relative z-50 w-full flex items-center justify-between px-10 py-4 border-b bg-[#0F1220] border-[#88C1D1]/40">
                <Link href={"/"} className="flex items-center gap-2 text-white font-bold text-lg cursor-pointer">
                    <Shield className="w-6 h-6 text-[#88C1D1]"/>
                    <span>CekFail</span>
                </Link>
                <div className="flex items-center gap-6 text-md text-[#AEAEAE] font-extralight">
                    <Link href={"/"} className="hover:text-white transition">Home</Link>
                    <Link href={"/about"} className="hover:text-white transition">About</Link>
                </div>
            </nav>
        </>
    )
}