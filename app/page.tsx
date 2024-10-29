"use client";

import FileUpload from "@/components/FileUpload";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-black">Upload Image</h1>
            <FileUpload />
        </main>
    );
}
