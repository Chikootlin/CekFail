"use client";

import ParticleBackground from "../components/particleBackground"
import { FileText, Hash, Copy, Code, TriangleAlert, Hexagon, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react";

type AnalysisResult = {
        fileName: string;
        size: number;
        mimeType: string;
        realType: string;
        hashes: {
            md5: string;
            sha1: string;
            sha256: string;
        }
        strings: string[];
        suspicious: {
            category: string;
            keyword: string;
            matched: string;
        }[];
        hex: string[];
        scanTime: string;
    };

export default function Result(){
    const [data] = useState<AnalysisResult | null>(() => {
        if (typeof window === "undefined") return null;

        const stored = sessionStorage.getItem("analysisResult");
        return stored ? JSON.parse(stored) : null;
    });

    const formatSize = (bytes?: number) => {
        if (bytes === undefined || bytes === null){
            return "Unknown";
        }
        if (bytes < 1024){
            return `${bytes} B`;
        }
        if (bytes < 1024 * 1024){
            return `${(bytes / 1024).toFixed(2)} KB`;
        }
        if (bytes < 1024 * 1024 * 1024){
            return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
        }
        return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
    };

    const [copied, setCopied] = useState("");

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            setTimeout(() => {
                setCopied("");
            }, 1500);
        }catch(err){
            console.error("Failed to copy", err);
        }
    }

    if (!data){
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    Loading...
                </div>
            </>
        )
    }

    return (
        <>
            <div className="relative min-h-screen md:min-h-0 overflow-hidden">
                <ParticleBackground/>
                <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pb-20 sm:px-6 lg:px-8">
                        <div className="flex items-start justify-between">
                            <Link href={"/"} className="text-base sm:text-xl">
                                &lt;- Back
                            </Link>
                            <div className="text-right">
                                <h1 className="text-lg font-bold sm:text-xl">
                                    Analysis Result
                                </h1>
                                <p className="text-xs text-[#AEAEAE] mt-1 sm:text-sm">
                                    Completed in {data.scanTime}s
                                </p>
                            </div>
                        </div>
                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-xl border border-[#88C1D1]/40 bg-[#101926] p-4 sm:p-6">
                            <div className="flex items-center gap-4 text-white text-sm sm:text-md">
                                <FileText className="w-5 h-5 shrink-0"/>
                                <span className="text-sm sm:text-base">
                                    File Information
                                </span>
                            </div>
                            <div className="flex flex-col  sm:grid sm:grid-cols-2 sm:gap-6 gap-4 mt-4">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-[#AEAEAE]">
                                            File Name
                                        </p>
                                        <p className="break-all text-sm text-white">
                                            {data?.fileName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#AEAEAE]">
                                            Size
                                        </p>
                                        <p className="text-sm text-white">
                                            {formatSize(data.size)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#AEAEAE]">
                                            Real Type
                                        </p>
                                        <p className="break-all text-sm text-white">
                                            {data?.realType}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-[#AEAEAE]">
                                            MIME Type
                                        </p>
                                        <p className="break-all text-sm text-white">
                                            {data?.mimeType}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-[#88C1D1]/40 bg-[#101926] p-4 sm:p-6">
                            <div className="flex items-center gap-4 text-white">
                                <Hash className="w-5 h-5 shrink-0"/>
                                <span className="text-sm sm:text-base">
                                    Hash Values
                                </span>
                            </div>
                            <div className="space-y-5 mt-6">
                                {[
                                    {
                                        label: "MD5",
                                        value: data.hashes.md5,
                                        type: "md5",
                                    },
                                    {
                                        label: "SHA1",
                                        value: data.hashes.sha1,
                                        type: "sha1",
                                    },
                                    {
                                        label: "SHA256",
                                        value: data.hashes.sha256,
                                        type: "sha256",
                                    },
                                ].map((hash) => (
                                    <div key={hash.type}>
                                        <p className="mb-1 text-xs text-[#AEAEAE]">
                                            {hash.label}
                                        </p>
                                        <div className="relative w-full rounded-lg bg-[#1F283B] py-2">
                                            <p className="truncate pr-10 pl-4 text-xs">
                                                {hash.value}
                                            </p>
                                            <button onClick={() => copyToClipboard(hash.value, hash.type)} className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#AEAEAE] transition-all duration-200 hover:bg-[#88C1D1]/10 hover:text-[#88C1D1] active:scale-95 cursor-pointer">
                                                {copied === hash.type ? (
                                                    <Check className="h-4 w-4"/>
                                                ) : (
                                                    <Copy className="h-4 w-4"/>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {/* <div>
                                    <p className="text-xs text-[#AEAEAE] mb-1">
                                        MD5
                                    </p>
                                    <div className="relative bg-[#1F283B] rounded-lg py-2 group w-full">
                                        <p className="text-xs pl-4 truncate">
                                            {data?.hashes.md5}
                                        </p>
                                        <button onClick={() => copyToClipboard(data.hashes.md5, "md5")} className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#AEAEAE] transition-all duration-200 hover:bg-[#88C1D1]/10 hover:text-[#88C1D1] active:scale-95 cursor-pointer">
                                            {copied === "md5" ? (
                                                <Check className="w-4 h-4"/>
                                            ) : (
                                                <Copy className="w-4 h-4"/>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-[#AEAEAE] mb-1">
                                        SHA1
                                    </p>
                                    <div className="relative bg-[#1F283B] rounded-lg py-2 group w-full">
                                        <p className="text-xs pl-4 truncate">
                                            {data?.hashes.sha1}
                                        </p>
                                        <button onClick={() => copyToClipboard(data.hashes.sha1, "sha1")} className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#AEAEAE] transition-all duration-200 hover:bg-[#88C1D1]/10 hover:text-[#88C1D1] active:scale-95  cursor-pointer">
                                            {copied === "sha1" ? (
                                                <Check className="w-4 h-4"/>
                                            ) : (
                                                <Copy className="w-4 h-4"/>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-[#AEAEAE] mb-1">
                                        SHA256
                                    </p>
                                    <div className="relative bg-[#1F283B] rounded-lg py-2 group w-full">
                                        <p className="text-xs pl-4 truncate">
                                            {data?.hashes.sha256}
                                        </p>
                                        <button onClick={() => copyToClipboard(data.hashes.sha256, "sha256")} className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#AEAEAE] transition-all duration-200 hover:bg-[#88C1D1]/10 hover:text-[#88C1D1] active:scale-95 cursor-pointer">
                                            {copied === "sha256" ? (
                                                <Check className="w-4 h-4"/>
                                            ) : (
                                                <Copy className="w-4 h-4"/>
                                            )}
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-[#88C1D1]/40 bg-[#101926] p-4 sm:p-6">
                        <div className="flex items-center gap-4 text-white">
                            <Code className="w-4 h-4 shrink-0"/>
                            <span className="text-sm sm:text-base">
                                Strings
                            </span>
                        </div>
                        <div className="mt-6 bg-[#1F283B] rounded-lg p-4">
                            <div className="max-h-75 overflow-y-auto space-y-1">
                                {data.strings.length > 0 ? (
                                    data.strings.map((str, i) => (
                                        <p key={i} className="text-xs font-mono text-[#AEAEAE] break-all">
                                            {str}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-xs text-[#AEAEAE]">
                                        No Strings Found
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-[#88C1D1]/40 bg-[#101926] p-4 sm:p-6">
                        <div className="flex items-center gap-4 text-white">
                            <TriangleAlert className="w-4 h-4 shrink-0"/>
                            <span className="text-sm sm:text-base">
                                Suspicious Strings
                            </span>
                        </div>
                        <div className="mt-6 bg-[#1F283B] rounded-lg p-4">
                            <div className="max-h-75 overflow-y-auto space-y-1">
                                {data.suspicious.length > 0 ? (
                                    data.suspicious.map((item, i) => (
                                        <div key={i} className="border-b border-[#2A3446] pb-2">
                                            <p className="text-red-400 text-xs font-bold">
                                                [{item.category}] {item.keyword}
                                            </p>
                                            <p className="text-xs font-mono text-[#AEAEAE] break-all">
                                                {item.matched}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-[#AEAEAE]">
                                        No Suspicious Indicators Found
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-[#88C1D1]/40 bg-[#101926] p-4 sm:p-6">
                        <div className="flex items-center gap-4 text-white">
                            <Hexagon className="w-4 h-4 shrink-0"/>
                            <span className="text-xs sm:text-base">
                                Hex
                            </span>
                        </div>
                        <div className="mt-6 overflow-x-auto bg-[#1F283B] rounded-lg p-4">
                            <div className="max-h-75 min-w-175 overflow-y-auto space-y-1">
                                {Array.from(
                                    {
                                        length: Math.ceil(
                                            data.hex.length / 16
                                        ),
                                    },
                                    (_, i) => {
                                        const chunk = data.hex.slice(
                                            i * 16,
                                            i * 16 + 16
                                        );

                                        const ascii = chunk.map((h) => {
                                            const byte = parseInt(h, 16);
                                            return byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : ".";
                                        }).join("");

                                        return (
                                            <p key={i} className="flex text-xs font-mono text-[#AEAEAE] whitespace-pre tracking-wide">
                                                <span className="text-[#88C1D1] mr-4 shrink-0">
                                                    {(i * 16).toString(16).padStart(8, "0").toUpperCase()}
                                                </span>
                                                <span className="tracking-wide">
                                                    {chunk.map((h) => h.toUpperCase()).join(" ").padEnd(47, " ")}
                                                </span>
                                                <span className="ml-6 text-[#7F8CA3]">
                                                    {ascii}
                                                </span>
                                            </p>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}