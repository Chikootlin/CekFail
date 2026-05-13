import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request){
    const start = performance.now();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if(!file){
        return NextResponse.json({
            error: "No File Uploaded"
        }, {
            status: 400
        });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { fileTypeFromBuffer } = await import("file-type");
    const detectedType = await fileTypeFromBuffer(buffer);

    const md5 = crypto.createHash("md5").update(buffer).digest("hex");
    const sha1 = crypto.createHash("sha1").update(buffer).digest("hex");
    const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");

    const hex = Array.from(buffer.subarray(0, 2048)).map((byte) => byte.toString(16).padStart(2, "0"));

    const strings = buffer.toString("utf-8").match(/[ -~]{4,}/g)?.slice(0, 50) || [];
    const suspiciousPatterns = {
        execution: [
            "cmd.exe",
            "powershell",
            "CreateProcess",
            "ShellExecute",
            "/bin/bash",
            "/bin/sh",
            "wscript",
            "cscript",
        ],
        network: [
            "http://",
            "https://",
            "ftp://",
            "socket",
            "connect",
            "wget",
            "curl",
            "user-agent",
        ],
        persistence: [
            "Run\\",
            "RunOnce",
            "Startup",
            "schtasks",
            "reg add",
            "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
        ],
        credential: [
            "password",
            "token",
            "apikey",
            "secret",
            "credential",
            "cookie",
            "sessionid",
        ],
        malware: [
            "keylogger",
            "inject",
            "payload",
            "meterpreter",
            "mimikatz",
            "ransom",
            "botnet",
            "stealer",
        ],
        evasion: [
            "VirtualAlloc",
            "WriteProcessMemory",
            "NtCreateThreadEx",
            "SetWindowsHookEx",
            "IsDebuggerPresent",
            "anti-vm",
            "sandbox",
        ],
    };

    const suspicious: {
        category: string;
        keyword: string;
        matched: string;
    }[] = [];

    for (const str of strings){
        for (const [category, keywords] of Object.entries(suspiciousPatterns)){
            for (const keyword of keywords){
                if (str.toLowerCase().includes(keyword.toLowerCase())){
                    suspicious.push({
                        category,
                        keyword,
                        matched: str,
                    });
                }
            }
        }
    }

    const end = performance.now();
    const scanTime = ((end - start) / 1000).toFixed(2);

    return NextResponse.json({
        fileName: file.name,
        size: file.size,
        mimeType: file.type || "application/octet-stream",
        realType: detectedType?.mime || "unknown",
        hashes: {
            md5,
            sha1,
            sha256,
        },
        strings,
        suspicious,
        hex,
        scanTime,
    });
}