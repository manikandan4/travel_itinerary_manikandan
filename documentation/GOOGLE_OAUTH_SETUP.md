# Google OAuth Setup Guide

## 🎯 The Error You're Seei### 3. **Restart your development servers:**
   ```bash
   ./cleanup-ports.sh
   ./start-dev.sh
   ```he "redirect_uri_mismatch" error means Google OAuth doesn't recognize the callback URL your app is using. This happens because the URLs in your Google Cloud Console don't match what your local development server is sending.

## 🔧 Fix: Update Google Cloud Console

### Step 1: Access Google Cloud Console
1. Go to: https://console.cloud.google.com/
2. Select your project (or create one if you haven't)
3. Navigate to **APIs & Services** > **Credentials**

### Step 2: Find Your OAuth 2.0 Client ID
- Look for "OAuth 2.0 Client IDs" section
- Click the **edit (pencil)** icon next to your client ID

### Step 3: Update the Configuration

**Authorized JavaScript origins** (add these exactly):
```
http://localhost:3000
http://localhost:3001
https://madk-travel-blog.kandan4.xyz
```

**Authorized redirect URIs** (add these exactly):
```
http://localhost:3001/auth/google/callback
https://madk-travel-blog.kandan4.xyz/auth/google/callback
```

### 🔥 **CRITICAL FOR PRODUCTION**: 
Your production callback URL is `https://madk-travel-blog.kandan4.xyz/auth/google/callback` - **NOT** a separate backend domain. This works because Nginx proxies `/auth/*` requests to your backend container.

### Step 4: Save Changes
Click **Save** at the bottom

## 🚀 What Each URL Does

### JavaScript Origins:
- `http://localhost:3000` - Your frontend dev server
- `http://localhost:3001` - Your backend API server  
- `https://madk-travel-blog.kandan4.xyz` - Your production domain

### Redirect URIs:
- `http://localhost:3001/auth/google/callback` - Local development callback
- `https://madk-travel-blog.kandan4.xyz/auth/google/callback` - Production callback

## ⏱️ Important Notes

1. **Changes take a few minutes**: Google OAuth changes can take 5-15 minutes to propagate
2. **Use exact URLs**: Make sure there are no trailing slashes or typos
3. **Both HTTP and HTTPS**: Local development uses HTTP, production uses HTTPS

## 🧪 Testing After Changes

1. Wait 5 minutes after saving changes in Google Console
2. Restart your development servers:
   ```bash
   ./cleanup-ports.sh
   ./start-dev-express.sh
   ```
3. Try the authentication flow again at: http://localhost:3000/login

## 🔍 Common Issues

### Still getting redirect_uri_mismatch?
- Double-check the URLs are exactly as shown above
- Wait a bit longer (up to 15 minutes)
- Clear your browser cache
- Try in an incognito/private window

### Domain doesn't work in production?
- Make sure your production domain is correctly configured in Cloudflare
- Update the production URLs in the Google Console if your domain changes

## 📱 Your Current Setup

Based on your configuration:
- **Frontend Dev Server**: http://localhost:3000 (Express with proxy)
- **Backend API**: http://localhost:3001 (Node.js/Express)
- **OAuth Flow**: Backend handles all OAuth, frontend proxies requests
- **Production Domain**: https://madk-travel-blog.kandan4.xyz

This is the correct setup for your authentication system!
