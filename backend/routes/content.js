const express = require('express');
const router = express.Router();
const { encryptData, decryptData } = require('../utils/encryption');
const { summarizeContent, summarizeChanges } = require('../utils/ai');
const { uploadToIPFS, getFromIPFS } = require('../utils/ipfs');
const { contents } = require('../utils/database');
const crypto = require('crypto');

// Upload Content
router.post('/upload', async (req, res) => {
    const { data, ownerAddress } = req.body;

    if (!data || !ownerAddress) return res.status(400).json({ error: 'Missing data' });

    // 1. Generate Symmetric Key
    const symmetricKey = crypto.randomBytes(32).toString('hex');

    // 2. Encrypt Data
    const { encrypted, iv, authTag } = encryptData(data, symmetricKey);

    // 3. Upload Encrypted Data to IPFS
    const payload = JSON.stringify({ encrypted, iv, authTag });
    const contentHash = await uploadToIPFS(payload);

    // 4. AI Summary (on raw data)
    const summary = await summarizeContent(data);

    // 5. Store Metadata in DB
    contents.set(contentHash, {
        owner: ownerAddress,
        summary,
        createdAt: Date.now()
    });

    res.json({
        contentHash,
        symmetricKey, // User must save this securely!
        summary
    });
});

// Modify Content
router.post('/:hash/modify', async (req, res) => {
    const { hash } = req.params;
    const { newData, symmetricKey, modifierAddress } = req.body;

    const oldRecord = contents.get(hash);
    if (!oldRecord) return res.status(404).json({ error: 'Content not found' });

    try {
        // Retrieve old data from IPFS to verify key
        const oldPayloadStr = await getFromIPFS(hash);
        const oldPayload = JSON.parse(oldPayloadStr);

        const oldData = decryptData(oldPayload.encrypted, symmetricKey, oldPayload.iv, oldPayload.authTag);

        // Encrypt New Data
        const { encrypted, iv, authTag } = encryptData(newData, symmetricKey);
        const newPayload = JSON.stringify({ encrypted, iv, authTag });
        const newContentHash = await uploadToIPFS(newPayload);

        const changeSummary = await summarizeChanges(oldData, newData);
        const newSummary = await summarizeContent(newData);

        contents.set(newContentHash, {
            owner: oldRecord.owner,
            summary: newSummary,
            modifiedBy: modifierAddress,
            previousHash: hash,
            createdAt: Date.now()
        });

        res.json({
            newContentHash,
            changeSummary,
            newSummary
        });

    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Invalid key or decryption failed' });
    }
});

// Get Content (Protected)
router.post('/:hash/retrieve', async (req, res) => {
    const { hash } = req.params;
    const { symmetricKey } = req.body;

    const record = contents.get(hash);
    if (!record) return res.status(404).json({ error: 'Not found' });

    try {
        const payloadStr = await getFromIPFS(hash);
        const payload = JSON.parse(payloadStr);

        const decrypted = decryptData(payload.encrypted, symmetricKey, payload.iv, payload.authTag);
        res.json({ data: decrypted, summary: record.summary });
    } catch (err) {
        console.error(err);
        res.status(403).json({ error: 'Decryption failed or IPFS error' });
    }
});

module.exports = router;
