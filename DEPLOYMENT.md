# Arogyta Deployment Guide

This guide will help you deploy the Arogyta project to GitHub Pages.

## Prerequisites

1. **Git**: You need Git installed on your computer.
2. **GitHub Account**: You need an account on [GitHub](https://github.com).

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in.
2. Click the **+** icon in the top right and select **New repository**.
3. Name your repository (e.g., `arogyta`).
4. Make sure it is **Public** (GitHub Pages is free for public repositories).
5. **Do not** initialize with README, .gitignore, or license (we already have these).
6. Click **Create repository**.

## Step 2: Initialize Git and Push

Open your terminal in the project folder (`a:\code\mm`) and run these commands:

```powershell
# Initialize git
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Rename branch to main
git branch -M main

# Link to your GitHub repository
# REPLACE 'YOUR_USERNAME' with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/arogyta.git

# Push to GitHub
git push -u origin main
```

## Step 3: Configure GitHub Pages

1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The deployment workflow we created will automatically pick this up.

## Step 4: Verify Deployment

1. Click on the **Actions** tab in your repository to see the deployment progress.
2. Once the "Deploy to GitHub Pages" workflow is green (success), click on it.
3. You will see the URL of your deployed site under the "deploy" job or in the Pages settings.

## Troubleshooting

- **404 Not Found**: Make sure your `vite.config.js` has the correct `base` path matching your repository name.
  - If your repo is `arogyta`, base should be `/arogyta/`.
  - If you are using `username.github.io`, base should be `/`.
- **Build Failed**: Check the Actions logs. Common issues are missing dependencies or linting errors.
