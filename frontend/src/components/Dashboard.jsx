import React, { useState, useEffect } from 'react';
import { addToHistory } from '../utils/history';

function Dashboard({ account }) {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Mock fetching requests
        // In real app: fetch(\`http://localhost:3000/api/access/pending/\${account}\`)
        setRequests([
            { contentHash: '0x123...', requesterAddress: '0xInstitution...', purpose: 'Medical Request' }
        ]);
    }, [account]);

    const handleGrant = (req) => {
        console.log("Granting access to", req.requesterAddress);
        // 1. Sign transaction
        // 2. Call backend to encrypt key
        // 3. Emit AccessGranted event

        // Mock success for demo
        addToHistory('GRANT_ACCESS', `Granted access to ${req.requesterAddress} for ${req.purpose}`);
        alert(`Access granted to ${req.requesterAddress}`);

        // Remove request from list
        setRequests(prev => prev.filter(r => r !== req));
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
