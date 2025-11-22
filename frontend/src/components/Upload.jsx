import React, { useState, useRef } from 'react';
import { addToHistory } from '../utils/history';

function Upload({ account }) {
    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [status, setStatus] = useState('');
    const [uploadType, setUploadType] = useState('file'); // 'file' or 'text'
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => setFileContent(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!fileContent) return;
        setUploading(true);
        setStatus('Encrypting & Uploading...');

        try {
            // Mock upload delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            const mockHash = '0x' + Math.random().toString(16).substr(2, 40);
            setStatus(`Success! Hash: ${mockHash}`);
            addToHistory('UPLOAD', `Uploaded ${fileName || 'text data'} with hash: ${mockHash}`);

            // Reset
            setTimeout(() => {
                setFileContent('');
                setFileName('');
                setStatus('');
                setUploading(false);
            }, 2000);
        } catch (error) {
            setStatus('Upload failed');
            setUploading(false);
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Upload Records</h2>

            {/* Upload Type Selection */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setUploadType('file')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all ${uploadType === 'file'
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                        }`}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c .621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="font-medium">Upload File</span>
                    </div>
                </button>
                <button
                    onClick={() => setUploadType('text')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all ${uploadType === 'text'
                            ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20'
                            : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                        }`}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <span className="font-medium">Enter Text</span>
                    </div>
                </button>
            </div>

            {uploadType === 'file' ? (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Select File</label>
                    <div className="relative">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-slate-300
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-600 file:text-white
                                hover:file:bg-blue-700
                                cursor-pointer bg-slate-900 rounded-lg border border-slate-700 p-2"
                        />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Supported: PDF, JPG, PNG, DOC, TXT</p>
                </div>
            ) : (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Data Content</label>
                    <textarea
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                        placeholder="Enter your medical data or notes here..."
                    />
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={uploading || !fileContent}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${uploading || !fileContent
                        ? 'bg-slate-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-600/20'
                    }`}
            >
                {uploading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Encrypting & Uploading...
                    </span>
                ) : 'Secure Upload'}
            </button>
        </div>
    );
}

export default Upload;
