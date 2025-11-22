import React, { useState } from 'react';

function Upload({ account }) {
    const [fileContent, setFileContent] = useState('');
    const [status, setStatus] = useState('');

    const handleUpload = async () => {
        if (!fileContent) return;
        setStatus('Uploading & Encrypting...');

        try {
            const response = await fetch('http://localhost:3000/api/content/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: fileContent, ownerAddress: account })
            });

            const result = await response.json();

            if (result.contentHash) {
                setStatus(`Success! Hash: ${result.contentHash}`);
                // Here we would trigger the smart contract transaction
                console.log("Symmetric Key (Save this!):", result.symmetricKey);
            } else {
                setStatus('Upload failed');
            }
        } catch (err) {
            console.error(err);
            setStatus('Error uploading');
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
