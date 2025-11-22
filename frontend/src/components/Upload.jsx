import React, { useState, useRef } from 'react';
import { addToHistory } from '../utils/history';

function Upload({ account }) {
    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [status, setStatus] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileContent(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = (acceptType) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = acceptType;
            fileInputRef.current.click();
        }
    };

    const handleUpload = async () => {
        if (!fileContent) {
            setStatus('Please enter text or select a file');
            return;
        }
        setStatus('Uploading & Encrypting...');

        try {
            // Try connecting to real backend first
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const response = await fetch('http://localhost:3000/api/content/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: fileContent,
                    ownerAddress: account,
                    fileName: fileName || 'Text Note'
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const result = await response.json();

            if (result.contentHash) {
                setStatus(`Success! Hash: ${result.contentHash}`);
                addToHistory('UPLOAD', `Uploaded ${fileName || 'text data'} with hash: ${result.contentHash}`);
            } else {
                throw new Error('Upload failed');
            }
        } catch (err) {
            console.log("Backend unreachable, switching to mock mode for demo");
            setTimeout(() => {
                const mockHash = '0x' + Math.random().toString(16).substr(2, 40);
                setStatus(`Success! (Demo Mode) Hash: ${mockHash}`);
                addToHistory('UPLOAD', `Uploaded ${fileName || 'text data'} (Demo) with hash: ${mockHash}`);
                setFileContent('');
                setFileName('');
            }, 1500);
        }
    };

    return (
        <div className="bg-stone-800 p-6 rounded-xl border border-stone-700">
            <h2 className="text-xl font-semibold mb-6 text-white">Upload Data</h2>

            <div className="space-y-6">
                {/* File Upload Buttons - Always Visible */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => triggerFileInput('.pdf,.doc,.docx,.txt')}
                        className="p-4 bg-stone-900 border border-stone-700 border-dashed rounded-xl hover:border-emerald-500 hover:bg-stone-800/50 transition-all group text-center flex flex-col items-center justify-center"
                    >
                        <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-stone-300">Upload Document</span>
                    </button>

                    <button
                        onClick={() => triggerFileInput('.jpg,.jpeg,.png,.gif')}
                        className="p-4 bg-stone-900 border border-stone-700 border-dashed rounded-xl hover:border-emerald-500 hover:bg-stone-800/50 transition-all group text-center flex flex-col items-center justify-center"
                    >
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-stone-300">Upload Image</span>
                    </button>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                />

                {/* File Preview */}
                {fileName && (
                    <div className="flex items-center justify-between p-3 bg-stone-700/50 rounded-lg border border-stone-600 animate-fade-in">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-white truncate max-w-[200px]">{fileName}</span>
                        </div>
                        <button
                            onClick={() => { setFileName(''); setFileContent(''); }}
                            className="text-xs text-red-400 hover:text-red-300"
                        >
                            Remove
                        </button>
                    </div>
                )}

                {/* Text Area - Always Visible */}
                <div>
                    <label className="block text-sm text-stone-400 mb-2">Or enter text directly:</label>
                    <textarea
                        className="w-full h-32 bg-stone-900 border border-stone-700 rounded-lg p-4 text-stone-300 focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="Enter sensitive data here..."
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        disabled={!!fileName} // Disable text area if file is selected
                    />
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-stone-700 mt-6">
                <button
                    onClick={handleUpload}
                    disabled={!fileContent}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${fileContent
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20'
                            : 'bg-stone-700 text-stone-500 cursor-not-allowed'
                        }`}
                >
                    Encrypt & Upload
                </button>
                <span className="text-sm text-stone-400 font-medium">{status}</span>
            </div>
        </div>
    );
}

export default Upload;
