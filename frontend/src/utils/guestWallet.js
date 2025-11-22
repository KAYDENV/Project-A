import { ethers } from 'ethers';

const GUEST_WALLET_KEY = 'arogyta_guest_wallet_pk';

export const getGuestWallet = () => {
    let privateKey = localStorage.getItem(GUEST_WALLET_KEY);

    if (!privateKey) {
        const wallet = ethers.Wallet.createRandom();
        privateKey = wallet.privateKey;
        localStorage.setItem(GUEST_WALLET_KEY, privateKey);
    }

    const wallet = new ethers.Wallet(privateKey);
    return wallet;
};

export const clearGuestWallet = () => {
    localStorage.removeItem(GUEST_WALLET_KEY);
};
