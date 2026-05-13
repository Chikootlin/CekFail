import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";

const jetbrains = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CekFail",
  description: "Analyze files, inspect hashes, strings, hex data, and suspicious indicators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={jetbrains.className}>
          <div className="bg-[#0A0F1B] min-h-screen relative">
            <Navbar/>
            <main className="mx-auto mt-20">
              {children}
            </main>
          </div>
        </body>
      </html>
    </>
  );
}
