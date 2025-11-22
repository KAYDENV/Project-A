import React, { useState } from 'react';
import PermissionRequestModal from './PermissionRequestModal';

function InstitutionDashboard({ institution, account }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

    // Mock users database
    const mockUsers = [
        { username: 'john_doe', name: 'John Doe', email: 'john@example.com', wallet: '0x123...' },
        { username: 'jane_smith', name: 'Jane Smith', email: 'jane@example.com', wallet: '0x456...' },
        { username: 'bob_wilson', name: 'Bob Wilson', email: 'bob@example.com', wallet: '0x789...' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        // Search by username or email
        const results = mockUsers.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleRequestPermission = (user) => {
        setSelectedUser(user);
        setIsPermissionModalOpen(true);
    };

    const handlePermissionGranted = (actionType, otp) => {
        console.log(`Permission granted for ${actionType} with OTP: ${otp}`);
        // In real app, send request to backend
        setIsPermissionModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
            <PermissionRequestModal
                isOpen={isPermissionModalOpen}
                onClose={() => setIsPermissionModalOpen(false)}
                user={selectedUser}
                institution={institution}
                onSubmit={handlePermissionGranted}
            />

            <div className="w-full max-w-3xl space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome, {institution?.institutionName || 'Institution'}
                    </h1>
                    <p className="text-slate-400">Search for patients to request access to their medical records</p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by username, name, or email..."
                            className="w-full px-6 py-4 pl-14 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all text-lg"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
                    >
                        Search
                    </button>
                </form>

                {/* Search Results */}
                {searchResults.length > 0 && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h3 className="text-lg font-semibold text-white">Search Results</h3>
                        <div className="space-y-2">
                            {searchResults.map((user, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-semibold text-white">{user.name}</h4>
                                                <span className="text-sm text-slate-400">@{user.username}</span>
                                            </div>
                                            <p className="text-sm text-slate-400">{user.email}</p>
                                            <p className="text-xs text-slate-500 font-mono">{user.wallet}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRequestPermission(user)}
                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-purple-600/20 group-hover:shadow-purple-600/40"
                                        >
                                            Request Permission
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {searchQuery && searchResults.length === 0 && (
                    <div className="text-center py-12 text-slate-400 animate-in fade-in duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-slate-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                        <p>No users found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InstitutionDashboard;
