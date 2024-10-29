"use client";

import { UploadButton } from '@/libs/uploadthing';
import Image from 'next/image';
import { useState } from "react";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleFileChange = (file: File | null) => {
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <UploadButton
                endpoint="imageUploader"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClientUploadComplete={(res:any) => {
                    if (res) {
                        setFileUrl(res[0]?.fileUrl); 
                        setStatusMessage("Upload successful!");
                        setProgress(100); 
                    }
                }}
                onUploadError={(error) => {
                    setStatusMessage(`Error: ${error.message}`);
                    setProgress(0); 
                }}
                onChange={(files) => {
                    handleFileChange(files[0] || null); 
                    setProgress(0); 
                }}
            />

            {previewUrl && <Image src={previewUrl} alt="Selected image preview" width={128} height={128} className="mt-4 w-32 h-32 object-cover rounded border" />}
0
            {selectedFile && progress > 0 && (
                <div className="relative w-full bg-gray-200 h-4 rounded mt-4">
                    <div className="absolute top-0 left-0 h-4 bg-blue-500 rounded" style={{ width: `${progress}%` }}></div>
                </div>
            )}

            {statusMessage && <p className="mt-4 text-red-500">{statusMessage}</p>}

            {fileUrl && (
                <div className="mt-4">
                    <p>Uploaded Image URL:</p>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {fileUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
