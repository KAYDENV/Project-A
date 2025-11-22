import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getGuestWallet } from '../utils/guestWallet';

function AuthModal({ isOpen, onClose, onComplete }) {
    const [step, setStep] = useState(1);
    const [isLogin, setIsLogin] = useState(false);
    const [isInstitution, setIsInstitution] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '', institutionName: '', institutionId: '' });
    const [error, setError] = useState('');

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setIsLogin(false);
            setIsInstitution(false);
            setFormData({ name: '', email: '', username: '', password: '', institutionName: '', institutionId: '' });
            setError('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isInstitution) {
            // Institution Validation
            if (isLogin) {
                if (!formData.institutionId || !formData.password) {
                    setError('Please enter institution ID and password');
                    return;
                }
            } else {
                if (!formData.institutionName || !formData.institutionId || !formData.email || !formData.password) {
                    setError('Please fill in all fields');
                    return;
                }
            }
        } else if (isLogin) {
            // User Login Validation
            if (!formData.username || !formData.password) {
                setError('Please enter username and password');
                return;
            }
        } else {
            // User Sign Up Validation
            if (!formData.name || !formData.email || !formData.username || !formData.password) {
                setError('Please fill in all fields');
                return;
            }

            const usernameRegex = /^[a-zA-Z0-9_.]+$/;
            if (!usernameRegex.test(formData.username)) {
                setError('Username can only contain letters, numbers, underscores, and dots');
                return;
            }
        }

        setStep(2);
    };

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                onComplete(formData, address, isInstitution);
            } catch (err) {
                console.error(err);
                setError('Connection failed');
            }
        } else {
            setError('MetaMask not found');
        }
    };

    const connectGuest = () => {
        const wallet = getGuestWallet();
        onComplete(formData, wallet.address, isInstitution);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({ name: '', email: '', username: '', password: '', institutionName: '', institutionId: '' });
    };

    const toggleInstitution = () => {
        setIsInstitution(!isInstitution);
        setError('');
        setFormData({ name: '', email: '', username: '', password: '', institutionName: '', institutionId: '' });
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
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <h3 className="text-xl font-semibold text-white">
                        {step === 1 ? (
                            isInstitution ? (isLogin ? 'Institution Login' : 'Register Institution') : (isLogin ? 'Welcome Back' : 'Create Account')
                        ) : 'Connect Wallet'}
                    </h3>
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
                <div className="p-6">
                    {step === 1 ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isInstitution ? (
                                // Institution Form
                                <>
                                    {!isLogin && (
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1">Institution Name</label>
                                            <input
                                                type="text"
                                                name="institutionName"
                                                value={formData.institutionName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                                placeholder="City Hospital"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Institution ID</label>
                                        <input
                                            type="text"
                                            name="institutionId"
                                            value={formData.institutionId}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                            placeholder="INST-12345"
                                        />
                                    </div>
                                    {!isLogin && (
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                                placeholder="contact@hospital.com"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </>
                            ) : (
                                // User Form
                                <>
                                    {!isLogin && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-2 text-slate-500">@</span>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className="w-full pl-8 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                                placeholder="username"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </>
                            )}

                            {error && <p className="text-red-400 text-sm">{error}</p>}

                            <button
                                type="submit"
                                className={`w-full py-2.5 ${isInstitution ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'} text-white font-semibold rounded-lg transition-colors shadow-lg`}
                            >
                                {isLogin ? 'Log In' : 'Continue'}
                            </button>

                            <div className="text-center pt-2 space-y-2">
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="text-sm text-slate-400 hover:text-white transition-colors block w-full"
                                >
                                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleInstitution}
                                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center justify-center space-x-1 w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                    </svg>
                                    <span>{isInstitution ? 'Sign in as User' : 'Sign in as Institution'}</span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-slate-400 text-sm mb-4">Select a wallet to link to your account.</p>

                            <button
                                onClick={connectMetaMask}
                                className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center space-x-4 transition-all group"
                            >
                                <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-white">MetaMask</h4>
                                    <p className="text-xs text-slate-400">Connect using browser wallet</p>
                                </div>
                            </button>

                            <button
                                onClick={connectGuest}
                                className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center space-x-4 transition-all group"
                            >
                                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-white">Guest Wallet</h4>
                                    <p className="text-xs text-slate-400">Create a temporary local wallet</p>
                                </div>
                            </button>

                            {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
                        </div>
                    )}
                </div>

                {/* Progress Dots */}
                <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-800 flex justify-center space-x-2">
                    <div className={`w-2 h-2 rounded-full transition-colors ${step === 1 ? 'bg-blue-500' : 'bg-slate-700'}`} />
                    <div className={`w-2 h-2 rounded-full transition-colors ${step === 2 ? 'bg-blue-500' : 'bg-slate-700'}`} />
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
