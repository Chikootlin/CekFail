"use client";
import ParticleBackground from "./components/particleBackground";
import { FileScan } from "lucide-react";
// import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/scan", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    sessionStorage.setItem(
      "analysisResult",
      JSON.stringify(data)
    );
    router.push("/result");
  }

  return (
    <>
      <div className="relative min-h-screen md:min-h-0 overflow-hidden">
        <ParticleBackground/>
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-4xl">
            ANALYZE YOUR FILE
          </h1>
          <p className="mt-4 text-[#AEAEAE] text-lg sm:text-base md:text-lg">
            Upload a file to inspect its structure, metadata, and potential security risks.
          </p>
          <label className="mt-10 flex h-120 w-full max-w-7xl cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#88C1D1]/40 bg-[#0F1220]/40 transition-all duration-300 ease-out hover:border-[#88C1D1] hover:bg-[#13192B] hover:shadow-[0_0_40px_rgba(136,193,209,0.15)] hover:scale-[1.01] min-h-75 sm:min-h-100 md:min-h-125 lg:min-h-150">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#88C1D1]/10 border border-[#88C1D1]/20 transition-all duration-300 group-hover:bg-[#88C1D1]/20 group-hover:scale-110 sm:h-24 sm:w-24">
              <FileScan className="h-10 w-10 sm:h-12 sm:w-12 text-[#88C1D1] transition-all duration-300 group-hover:scale-110" strokeWidth={1.5}/>
            </div>
            <h2 className="mt-6 text-base sm:text-lg md:text-xl">
              Drop File Here Or Click To Browse
            </h2>
            <input type="file" className="hidden" onChange={handleFileChange}/>
          </label>
        </div>
      </div>
    </>
  );
}
