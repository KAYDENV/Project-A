import React, { useState, useEffect } from 'react';

// Must match the version in public/version.json when deploying
const CURRENT_VERSION = "1.0.1";

const UpdateToast = () => {
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        const checkVersion = async () => {
            try {
                // Add timestamp to prevent caching
                const response = await fetch(`/Project-A/version.json?t=${Date.now()}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.version !== CURRENT_VERSION) {
                        console.log(`New version available: ${data.version} (Current: ${CURRENT_VERSION})`);
                        setUpdateAvailable(true);
                    }
                }
            } catch (err) {
                console.error("Failed to check for updates:", err);
            }
        };

        // Check immediately
        checkVersion();

        // Check every 60 seconds
        const interval = setInterval(checkVersion, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        window.location.reload();
    };

    if (!updateAvailable) return null;

    return (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-4 border border-blue-400">
                <div className="flex flex-col">
                    <span className="font-bold text-sm">Update Available!</span>
                    <span className="text-xs text-blue-100">A new version of Arogyta is ready.</span>
                </div>
                <button
                    onClick={handleRefresh}
                    className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm"
                >
                    Refresh Now
                </button>
                <button
                    onClick={() => setUpdateAvailable(false)}
                    className="text-blue-200 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default UpdateToast;
