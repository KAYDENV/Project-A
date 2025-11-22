# Deploying the Backend to Render

Since GitHub Pages only hosts static websites (Frontend), we need a separate service to host the Node.js Backend. **Render** is a great choice because it has a free tier and is easy to set up.

## Prerequisites
- You have a GitHub account.
- The backend code is pushed to your GitHub repository (we will do this in the next step).

## Step 1: Push Backend Code to GitHub
(If you haven't already)
1. Open your terminal in `a:\code\mm`.
2. Run:
   ```bash
   git add .
   git commit -m "Prepare backend for deployment"
   git push origin main
   ```

## Step 2: Create a Web Service on Render
1. Go to [dashboard.render.com](https://dashboard.render.com/) and sign up/login with GitHub.
2. Click **"New +"** and select **"Web Service"**.
3. Select **"Build and deploy from a Git repository"**.
4. Connect your repository (`Project-A` or whatever you named it).
5. Configure the service:
   - **Name**: `arogyta-backend` (or similar)
   - **Region**: Choose the one closest to you (e.g., Singapore, Oregon).
   - **Branch**: `main`
   - **Root Directory**: `backend` (Important! This tells Render where the server code is).
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

6. Click **"Create Web Service"**.

## Step 3: Get Your Backend URL
1. Wait for the deployment to finish. It might take a few minutes.
2. Once live, you will see a URL at the top left, looking like: `https://arogyta-backend.onrender.com`.
3. **Copy this URL.**

## Step 4: Connect Frontend to Backend
Now we need to tell your GitHub Pages frontend where the backend lives.

1. Go to your GitHub Repository settings.
2. Navigate to **Settings > Secrets and variables > Actions**.
3. (Actually, for a static Vite app on GitHub Pages, we build at deploy time, but let's keep it simple).
4. **Easiest Method**:
   - Open `frontend/src/config.js` in your local code.
   - Change the fallback URL to your new Render URL:
     ```javascript
     const config = {
         API_URL: import.meta.env.VITE_API_URL || 'https://YOUR-RENDER-APP-NAME.onrender.com/api'
     };
     ```
   - Commit and push this change. GitHub Pages will rebuild, and your app will connect to the live backend!

## Important Note on Data
Since we are using a simple in-memory database (`utils/database.js`), **all data (users, uploads) will be wiped whenever the Render server restarts** (which happens frequently on the free tier). For a real production app, you would need a database like MongoDB Atlas.
