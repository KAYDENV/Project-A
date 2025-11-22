const express = require('express');
const router = express.Router();
const { encryptKeyForRecipient } = require('../utils/encryption');
const { accessRequests } = require('../utils/database');

// Request Access
router.post('/request', (req, res) => {
    const { contentHash, requesterAddress, purpose } = req.body;
    accessRequests.push({ contentHash, requesterAddress, purpose, status: 'pending' });
    res.json({ success: true });
});

// Get Pending Requests
router.get('/pending/:ownerAddress', (req, res) => {
    // Filter requests for content owned by this address (Mock: assume we know ownership)
    // In real app, query DB for content owned by user.
    res.json(accessRequests.filter(r => r.status === 'pending'));
});

// Grant Access (Backend helper to encrypt key)
router.post('/grant', (req, res) => {
    const { symmetricKey, granteePublicKey } = req.body;

    // Encrypt the symmetric key with grantee's public key
    const encryptedKey = encryptKeyForRecipient(symmetricKey, granteePublicKey);

    res.json({ encryptedKey });
});

module.exports = router;
