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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-stone-800 rounded-2xl p-8 w-full max-w-md border border-stone-700 shadow-2xl animate-fade-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {step === 1 && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-6">Connect Wallet</h2>
                        <button
                            onClick={handleConnectWallet}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl font-bold text-white shadow-lg transform hover:scale-105 transition-all"
                        >
                            Connect MetaMask
                        </button>
                        <p className="mt-4 text-stone-400 text-sm">Secure connection powered by Ethereum</p>
                    </div>
                )}

                {step === 2 && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-6">Who are you?</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleTypeSelect('user')}
                                className="p-6 bg-stone-700 hover:bg-emerald-600 rounded-xl border border-stone-600 hover:border-emerald-500 transition-all group"
                            >
                                <div className="w-12 h-12 bg-stone-600 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                <span className="text-white font-semibold">Individual</span>
                            </button>
                            <button
                                onClick={() => handleTypeSelect('institution')}
                                className="p-6 bg-stone-700 hover:bg-teal-600 rounded-xl border border-stone-600 hover:border-teal-500 transition-all group"
                            >
                                <div className="w-12 h-12 bg-stone-600 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                    </svg>
                                </div>
                                <span className="text-white font-semibold">Institution</span>
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {userType === 'user' ? 'Create Profile' : 'Institution Details'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {userType === 'user' ? (
                                <>
                                    <div>
                                        <label className="block text-sm text-stone-400 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-stone-400 mb-1">Username</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                                            value={formData.username}
                                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm text-stone-400 mb-1">Institution Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                                            value={formData.institutionName}
                                            onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-stone-400 mb-1">Registration ID</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                                            value={formData.institutionId}
                                            onChange={e => setFormData({ ...formData, institutionId: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="block text-sm text-stone-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all mt-4 ${userType === 'user'
                                    ? 'bg-emerald-600 hover:bg-emerald-700'
                                    : 'bg-teal-600 hover:bg-teal-700'
                                    }`}
                            >
                                Complete Registration
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthModal;
