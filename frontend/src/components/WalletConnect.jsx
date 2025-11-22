import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getGuestWallet } from '../utils/guestWallet';

function WalletConnect({ account, setAccount }) {
    const [showOptions, setShowOptions] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                setShowOptions(false);
            } catch (error) {
                console.error("Connection failed", error);
            }
        } else {
            alert("Please install Metamask!");
        }
    };

    const connectGuest = () => {
        const wallet = getGuestWallet();
        setAccount(wallet.address);
        setShowOptions(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => !account && setShowOptions(!showOptions)}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shadow-lg hover:shadow-blue-500/50"
                title={account ? `Connected: ${account}` : "Connect Wallet"}
            >
                {account ? (
                    <div className="w-8 h-8 flex items-center justify-center bg-green-500 rounded-full text-white font-bold">
                        {account.slice(2, 4).toUpperCase()}
                    </div>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6v12a2.25 2.25 0 002.25 2.25h16.5A2.25 2.25 0 0022.5 18v-12" />
                    </svg>
                )}
            </button>

            {showOptions && !account && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden z-50">
                    <button
                        onClick={connectWallet}
                        className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center space-x-2"
                    >
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span>MetaMask</span>
                    </button>
                    <button
                        onClick={connectGuest}
                        className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center space-x-2 border-t border-slate-700"
                    >
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Guest Wallet</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default WalletConnect;
