import React, { useState } from 'react';
import { addToHistory } from '../utils/history';

function Upload({ account }) {
    const [fileContent, setFileContent] = useState('');
    const [status, setStatus] = useState('');

    const handleUpload = async () => {
        if (!fileContent) return;
        setStatus('Uploading & Encrypting...');

        try {
            // Try connecting to real backend first
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

            const response = await fetch('http://localhost:3000/api/content/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: fileContent, ownerAddress: account }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const result = await response.json();

            if (result.contentHash) {
                setStatus(`Success! Hash: ${result.contentHash}`);
                addToHistory('UPLOAD', `Uploaded data with hash: ${result.contentHash}`);
                console.log("Symmetric Key (Save this!):", result.symmetricKey);
            } else {
                throw new Error('Upload failed');
            }
        } catch (err) {
            console.log("Backend unreachable, switching to mock mode for demo");
            // Mock Fallback for Demo/GitHub Pages
            setTimeout(() => {
                const mockHash = '0x' + Math.random().toString(16).substr(2, 40);
                setStatus(`Success! (Demo Mode) Hash: ${mockHash}`);
                addToHistory('UPLOAD', `Uploaded data (Demo) with hash: ${mockHash}`);
                setFileContent('');
            }, 1500);
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Upload Data</h2>
            <textarea
                className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 mb-4 focus:outline-none focus:border-blue-500"
                placeholder="Enter sensitive data here..."
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
            />
            <div className="flex justify-between items-center">
                <button
                    onClick={handleUpload}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
                >
                    Encrypt & Upload
                </button>
                <span className="text-sm text-slate-400">{status}</span>
            </div>
        </div>
    );
}

export default Upload;
