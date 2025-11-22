const express = require('express');
const { ethers } = require('ethers');
const crypto = require('crypto');
const router = express.Router();

// In-memory store for nonces (use Redis/DB in production)
const nonces = new Map();

// Generate Nonce
router.get('/nonce', (req, res) => {
    const nonce = crypto.randomBytes(16).toString('hex');
    const { address } = req.query;

    if (!address) return res.status(400).json({ error: 'Address required' });

    nonces.set(address.toLowerCase(), nonce);
    res.json({ nonce });
});

// Verify Signature
router.post('/verify', (req, res) => {
    const { address, signature } = req.body;

    if (!address || !signature) return res.status(400).json({ error: 'Missing params' });

    const nonce = nonces.get(address.toLowerCase());
    if (!nonce) return res.status(400).json({ error: 'Nonce not found or expired' });

    const message = `Sign this message to verify ownership: ${nonce}`;

    try {
        const recoveredAddress = ethers.verifyMessage(message, signature);

        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
            // Success: Issue JWT or Session (Mocked here)
            nonces.delete(address.toLowerCase()); // Nonce used once
            res.json({ success: true, token: 'mock-jwt-token-' + address });
        } else {
            res.status(401).json({ error: 'Invalid signature' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

module.exports = router;
