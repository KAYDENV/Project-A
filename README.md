# Web3 Data Privacy Prototype

This project demonstrates a user-controlled data access system using Ethereum, IPFS, and AI summarization.

## Prerequisites
- Node.js (v16+)
- Metamask Wallet

## Project Structure
- `contracts/`: Solidity Smart Contracts (AccessRegistry)
- `backend/`: Node.js Express Server (Auth, Encryption, IPFS Mock)
- `frontend/`: React + Vite Application

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
node server.js
```
Server runs on `http://localhost:3000`.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

### 3. Smart Contracts (Optional for local dev)
```bash
cd contracts
npm install
npx hardhat node
# In another terminal:
npx hardhat run scripts/deploy.js --network localhost
```

## Features
- **Upload**: Encrypts data client-side/server-side, uploads to IPFS, records hash on-chain.
- **Access Control**: Users grant access to institutions via ECIES encrypted keys.
- **Audit Trail**: All modifications and access grants are logged on Ethereum.
- **AI Summary**: Automatically summarizes uploaded content and modifications.
