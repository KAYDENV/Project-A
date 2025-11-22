import React, { useState, useEffect } from 'react';
import { addToHistory } from '../utils/history';
import config from '../config';

function Dashboard({ account }) {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (account) {
            fetch(`${config.API_URL}/access/pending/${account}`)
                .then(res => res.json())
                .then(data => setRequests(data))
                .catch(err => console.error("Failed to fetch requests:", err));
        }
    }, [account]);

    const handleGrant = async (req) => {
        try {
            // In a real app, we would encrypt the symmetric key here using the requester's public key.
            // For this prototype, we'll simulate the backend call.

            const response = await fetch(`${config.API_URL}/access/grant`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    symmetricKey: 'mock-key-to-encrypt', // In real app, get this from secure storage
                    granteePublicKey: 'mock-public-key'
                })
            });

            if (response.ok) {
                addToHistory('GRANT_ACCESS', `Granted access to ${req.requesterAddress} for ${req.purpose}`);
                alert(`Access granted to ${req.requesterAddress}`);
                setRequests(prev => prev.filter(r => r !== req));
            }
        } catch (error) {
            console.error("Grant failed:", error);
            alert("Failed to grant access");
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Access Requests</h2>
            {requests.length === 0 ? (
                <p className="text-slate-400">No pending requests.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map((req, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-900 p-4 rounded-lg">
                            <div>
                                <p className="font-medium text-blue-400">{req.requesterAddress}</p>
                                <p className="text-sm text-slate-400">Purpose: {req.purpose}</p>
                            </div>
                            <button
                                onClick={() => handleGrant(req)}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold text-white"
                            >
                                Grant Access
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
