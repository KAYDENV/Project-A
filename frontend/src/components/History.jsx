import React, { useState, useEffect } from 'react';
import { getHistory } from '../utils/history';

function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString();
    };

    const getActionColor = (action) => {
        switch (action) {
            case 'UPLOAD': return 'text-green-400';
            case 'GRANT_ACCESS': return 'text-purple-400';
            case 'MODIFY': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Activity History</h2>
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                {history.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                        No activity recorded yet.
                    </div>
                ) : (
                    <div className="divide-y divide-slate-700">
                        {history.map((item) => (
                            <div key={item.id} className="p-4 hover:bg-slate-750 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className={`font-semibold ${getActionColor(item.action)} mb-1`}>
                                            {item.action.replace('_', ' ')}
                                        </div>
                                        <p className="text-slate-300 text-sm">{item.details}</p>
                                    </div>
                                    <div className="text-xs text-slate-500 font-mono">
                                        {formatDate(item.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default History;
