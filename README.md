# Arogyta - Web3 Data Privacy Platform

Arogyta is a privacy-first platform designed to let users safely store and manage their personal records. Powered by blockchain for security and AI for smart insights, it ensures that only verified institutions can access or update information with explicit user permission.

## 🚀 Technology Stack & Design Choices

### 1. Frontend Framework: **React.js**
**Why we chose it:**
- **Component-Based Architecture:** Allows for reusable UI components (like the Sidebar, Modals, and Dashboard widgets), making the codebase modular and easier to maintain.
- **Virtual DOM:** Ensures high performance by only updating parts of the page that change, which is crucial for a dashboard-heavy application.
- **Ecosystem:** Massive library support for Web3 integrations (like `ethers.js` and wallet connectors).

**Advantages over plain HTML/JS:**
- Better state management for handling complex user data and wallet states.
- Faster development cycle with hot-reloading.

### 2. Build Tool: **Vite**
**Why we chose it:**
- **Lightning Fast:** Uses native ES modules for development, making server start and hot module replacement (HMR) near-instant.
- **Optimized Build:** Uses Rollup for production builds, resulting in smaller bundle sizes and faster load times for users.

**Advantages over Create React App (Webpack):**
- Significantly faster startup time (milliseconds vs seconds/minutes).
- Better out-of-the-box support for modern browser features.

### 3. Styling: **Tailwind CSS**
**Why we chose it:**
- **Utility-First:** Allows for rapid UI development by composing classes directly in the markup.
- **Customization:** We implemented a custom design system with specific color palettes (slate/blue/purple) and glassmorphism effects without writing custom CSS files.
- **Responsive Design:** Built-in modifiers make it effortless to build a layout that works on mobile and desktop.

**Advantages over Bootstrap/Material UI:**
- **No "Cookie-Cutter" Look:** Gives us complete control over the design language, allowing for the premium, dark-mode aesthetic we achieved.
- **Smaller Bundle Size:** Purges unused styles in production, keeping the site lightweight.

### 4. Blockchain Interaction: **Ethers.js**
**Why we chose it:**
- **Lightweight & Secure:** A complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.
- **Developer Friendly:** extensive documentation and a cleaner API compared to alternatives.

**Advantages over Web3.js:**
- Smaller library size (~88kb vs ~300kb).
- Better separation of concerns (Provider vs Signer).

### 5. Hosting: **GitHub Pages**
**Why we chose it:**
- **Integration:** Seamlessly integrated with our version control system.
- **Automated Deployment:** We set up GitHub Actions to automatically build and deploy the site whenever code is pushed, ensuring the live site is always up to date.
- **Cost:** Free hosting for public repositories.

## 🛠️ Features

- **Decentralized Identity:** Login with MetaMask wallet.
- **Secure Storage:** Off-chain storage with on-chain verification hash.
- **Permission System:** Smart contract-based access control for institutions.
- **Responsive Dashboard:** Modern, dark-themed UI with real-time updates.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KAYDENV/Project-A.git
   ```
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
