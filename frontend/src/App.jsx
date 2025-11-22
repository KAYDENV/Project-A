import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import Upload from './components/Upload';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';
import NewsWidget from './components/NewsWidget';
import InfoSection from './components/InfoSection';
import InstitutionDashboard from './components/InstitutionDashboard';
import InstitutionProfile from './components/InstitutionProfile';
import History from './components/History';

import AIAssistant from './components/AIAssistant';

function App() {
    const [account, setAccount] = useState(null);
    const [user, setUser] = useState(null);
    const [isInstitution, setIsInstitution] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard');
    const [refreshKey, setRefreshKey] = useState(0);

    const handleAuthComplete = (userData, walletAddress, isInst = false) => {
        setUser(userData);
        setAccount(walletAddress);
        setIsInstitution(isInst);
        setIsAuthModalOpen(false);
    };

    const handleHeaderClick = () => {
        if (currentView !== 'dashboard') {
            setCurrentView('dashboard');
        } else {
            setRefreshKey(prev => prev + 1);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setAccount(null);
        setIsInstitution(false);
        setCurrentView('dashboard');
    };

    return (
        <div className="min-h-screen p-8">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                user={user}
                account={account}
                setCurrentView={setCurrentView}
                isInstitution={isInstitution}
            />
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onComplete={handleAuthComplete}
            />
            <AIAssistant
                isOpen={isAIOpen}
                onClose={() => setIsAIOpen(false)}
            />

            <header className="grid grid-cols-3 items-center mb-12">
                <div className="col-start-1 justify-self-start">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div className="col-start-2 text-center">
                    <button
                        onClick={handleHeaderClick}
                        className="hover:scale-105 transition-transform duration-200 focus:outline-none flex flex-col items-center justify-center"
                        title={currentView === 'dashboard' ? 'Refresh Dashboard' : 'Go to Dashboard'}
                    >
                        <img src="/Project-A/logo.png" alt="Arogyta Logo" className="h-24 w-auto mb-2 drop-shadow-lg" />
                        <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-900 tracking-widest cursor-pointer drop-shadow-sm">
                            AROGYTA
                        </h1>
                    </button>
                </div>
                <div className="col-start-3 justify-self-end">
                    {account ? (
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setIsAIOpen(!isAIOpen)}
                                className={`p-2 rounded-full transition-all shadow-lg group ${isAIOpen
                                    ? 'bg-white text-purple-600 shadow-purple-600/50 scale-110'
                                    : 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-600/20'
                                    }`}
                                title="AI Assistant"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 group-hover:scale-110 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                </svg>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors shadow-lg shadow-red-600/20 group"
                                title="Logout"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white group-hover:scale-110 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-colors shadow-lg shadow-blue-600/20 flex items-center space-x-2"
                        >
                            <span>Sign In</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    )}
                </div>
            </header>

            <main className="max-w-4xl mx-auto space-y-8">
                {currentView === 'about' && <About />}
                {currentView === 'contact' && <Contact />}

                {currentView === 'dashboard' && (
                    <>
                        {!account ? (
                            <div className="text-center py-12 px-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl">
                                <h2 className="text-2xl font-semibold text-blue-400 mb-6">Welcome to Arogyta</h2>
                                <div className="space-y-4 text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                    <p>
                                        Arogyta is a privacy-first platform designed to let users safely store and manage their personal records.
                                    </p>
                                    <p>
                                        Powered by blockchain for security and AI for smart insights, Arogyta ensures that only verified institutions can access or update your information — and only when you give permission. Every action is transparent, tamper-proof, and fully in your control.
                                    </p>
                                    <p>
                                        Whether it's certificates, documents, or personal data, Arogyta protects your information while making it easy to understand and share.
                                    </p>
                                </div>
                                <div className="mt-8 text-slate-400 text-sm">
                                    Sign in to access your dashboard
                                </div>
                            </div>
                        ) : (
                            <>
                                {isInstitution ? (
                                    <InstitutionDashboard institution={user} account={account} />
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                            <div className="lg:col-span-2 space-y-8">
                                                <Upload account={account} />
                                                <Dashboard key={refreshKey} account={account} />
                                            </div>
                                            <div className="lg:col-span-1">
                                                <NewsWidget />
                                            </div>
                                        </div>
                                        <div className="mt-12">
                                            <InfoSection />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}

                {currentView === 'profile' && <Profile user={user} account={account} setUser={setUser} />}
                {currentView === 'institutionProfile' && <InstitutionProfile institution={user} account={account} setInstitution={setUser} />}
                {currentView === 'history' && <History />}
            </main>

            <footer className="mt-20 py-8 bg-black text-center">
                <p className="text-white font-medium tracking-wide">
                    Made with a mission to make everyone healthy - Ronit
                </p>
            </footer>
        </div >
    );
}

export default App;
