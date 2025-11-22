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
        </div >
    );
};

export default UpdateToast;
