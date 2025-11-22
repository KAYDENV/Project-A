import React, { useState } from 'react';

function PermissionRequestModal({ isOpen, onClose, user, institution, onSubmit }) {
    const [actionType, setActionType] = useState('modify');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    if (!isOpen || !user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        // In real app, verify OTP with backend
        // For prototype, accept any 6-digit code
        onSubmit(actionType, otp);
        setOtp('');
        setActionType('modify');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-purple-900/20">
                    <h3 className="text-xl font-semibold text-white">Request Permission</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* User Info */}
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <p className="text-sm text-slate-400 mb-1">Requesting access to:</p>
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-slate-400">@{user.username}</p>
                    </div>

                    {/* Action Type */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Action Type</label>
                        <div className="space-y-2">
                            <label className="flex items-center p-3 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                                <input
                                    type="radio"
                                    name="actionType"
                                    value="modify"
                                    checked={actionType === 'modify'}
                                    onChange={(e) => setActionType(e.target.value)}
                                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-3 text-white">Modify Medical Report</span>
                            </label>
                            <label className="flex items-center p-3 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                                <input
                                    type="radio"
                                    name="actionType"
                                    value="add"
                                    checked={actionType === 'add'}
                                    onChange={(e) => setActionType(e.target.value)}
                                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-3 text-white">Add Medical Report</span>
                            </label>
                        </div>
                    </div>

                    {/* OTP Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            User OTP Verification
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                            The user must provide their 6-digit OTP to grant permission
                        </p>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="Enter 6-digit OTP"
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all font-mono"
                            maxLength={6}
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-purple-600/20"
                    >
                        Request Access
                    </button>

                    <p className="text-xs text-center text-slate-500">
                        This request will be logged on the blockchain for transparency
                    </p>
                </form>
            </div>
        </div>
    );
}

export default PermissionRequestModal;
