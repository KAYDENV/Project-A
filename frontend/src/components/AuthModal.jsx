import React, { useState } from 'react';

function AuthModal({ isOpen, onClose, onComplete }) {
    const [step, setStep] = useState(1); // 1: Wallet, 2: Type, 3: Details
    const [walletAddress, setWalletAddress] = useState('');
    const [userType, setUserType] = useState(''); // 'user' or 'institution'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        institutionName: '',
        institutionId: ''
    });
    const [isRegistering, setIsRegistering] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConnectWallet = () => {
        // Mock Wallet Connection
        const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
        setWalletAddress(mockAddress);
        setStep(2);
    };

    const handleTypeSelect = (type) => {
        setUserType(type);
        setStep(3);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onComplete(formData, walletAddress, userType === 'institution');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 transform transition-all scale-100">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">
                    {isRegistering ? 'Create Account' : 'Welcome Back'}
                </h2>

                {/* User Type Selection */}
                <div className="flex mb-6 bg-slate-900 p-1 rounded-lg">
                    <button
                        onClick={() => setUserType('user')}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${userType === 'user'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        User
                    </button>
                    <button
                        onClick={() => setUserType('institution')}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${userType === 'institution'
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Institution
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">
                                {userType === 'institution' ? 'Institution Name' : 'Full Name'}
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder={userType === 'institution' ? "e.g. City Hospital" : "e.g. John Doe"}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    {isRegistering && userType === 'user' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="@username"
                                required
                            />
                        </div>
                    )}

                    {userType === 'institution' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Institution ID</label>
                            <input
                                type="text"
                                name="institutionId"
                                value={formData.institutionId}
                                onChange={handleChange}
                                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g. HOSP-12345"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all shadow-lg mt-6 ${userType === 'institution'
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-purple-600/20'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-blue-600/20'
                            }`}
                    >
                        {isRegistering ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-sm text-slate-400 hover:text-white underline decoration-slate-600 hover:decoration-white transition-all"
                    >
                        {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Register"}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default AuthModal;
