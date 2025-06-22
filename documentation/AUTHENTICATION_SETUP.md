# MADK Travel Blog - Authentication Setup Guide

## 🔐 Authentication System Overview

This guide will help you set up Google OAuth authentication for your family travel blog. The system restricts access to only whitelisted family Gmail accounts.

## 📋 Prerequisites

1. Google Cloud Platform account
2. Domain/subdomain for your application
3. Raspberry Pi with Docker installed
4. Basic familiarity with terminal/command line

## 🚀 Step 1: Local Development Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd /Users/manikandan/Work/JS_workspace/TravelDiary/map/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit the environment file:**
   ```bash
   nano .env
   ```
   
   Update these critical values:
   ```env
   # Google OAuth (get from Google Cloud Console)
   GOOGLE_CLIENT_ID=your_actual_google_client_id
   GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
   
   # Family email whitelist
   ALLOWED_EMAILS=your.email@gmail.com,spouse@gmail.com,child@gmail.com
   
   # Session secret (generate a random string)
   SESSION_SECRET=your_super_secret_random_string_here
   
   # Local development URLs
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:3001
   ```

### Frontend Setup (if testing locally)

1. **Install a local web server:**
   ```bash
   # Option 1: Python (if you have Python installed)
   cd /Users/manikandan/Work/JS_workspace/TravelDiary/map
   python3 -m http.server 3000
   
   # Option 2: Node.js http-server
   npm install -g http-server
   http-server -p 3000
   
   # Option 3: Use VS Code Live Server extension
   ```

2. **Start backend server:**
   ```bash
   cd backend
   npm run dev
   ```

## 🌐 Step 2: Google OAuth Setup

### Create Google Cloud Project

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/
   - Create a new project or select existing one

2. **Enable Google+ API:**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"

4. **Configure OAuth Client:**
   ```
   Name: MADK Travel Blog
   
   Authorized JavaScript origins:
   - http://localhost:3001 (for local development)
   - https://madk-travel-blog.kandan4.xyz (for production)
   
   Authorized redirect URIs:
   - http://localhost:3001/auth/google/callback (for local development)
   - https://madk-travel-blog.kandan4.xyz/auth/google/callback (for production)
   ```

5. **Copy credentials:**
   - Copy the Client ID and Client Secret
   - Update your `.env` file with these values

## 🔧 Step 3: Local Testing

1. **Start both services:**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev
   
   # Terminal 2: Frontend (if using Python server)
   cd ..
   python3 -m http.server 3000
   ```

2. **Test the flow:**
   - Visit: http://localhost:3000/login.html
   - Click "Continue with Google"
   - Sign in with a Gmail account from your whitelist
   - Should redirect to main site

3. **Check authentication:**
   - Visit: http://localhost:3000/index.html
   - Should only work if authenticated
   - Should show user info in navigation

## 🚢 Step 4: Production Deployment

### Update Environment for Production

1. **Create production environment file on Pi:**
   ```bash
   ssh manikandan4@raspberrypi.local
   cd /home/manikandan4/docker/madk-travel-blog/backend
   nano .env
   ```

2. **Update production URLs:**
   ```env
   NODE_ENV=production
   FRONTEND_URL=https://madk-travel-blog.kandan4.xyz
   BACKEND_URL=https://madk-travel-blog.kandan4.xyz
   
   # Keep same Google OAuth credentials
   GOOGLE_CLIENT_ID=your_actual_google_client_id
   GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
   
   # Family emails (update as needed)
   ALLOWED_EMAILS=family1@gmail.com,family2@gmail.com,family3@gmail.com
   
   # Generate new session secret for production
   SESSION_SECRET=different_super_secret_for_production
   ```

### Deploy to Raspberry Pi

1. **Run deployment script:**
   ```bash
   cd /Users/manikandan/Work/JS_workspace/TravelDiary/map
   ./deploy.sh main
   ```

2. **Complete configuration on Pi:**
   ```bash
   ssh manikandan4@raspberrypi.local
   cd /home/manikandan4/docker/madk-travel-blog/backend
   nano .env  # Update with your actual values
   
   # Restart containers
   cd ..
   docker compose restart
   ```

## 🎯 Step 5: Domain Configuration

### Update Google OAuth for Production

1. **Add production URLs to Google OAuth:**
   - Go back to Google Cloud Console
   - Update your OAuth client with production URLs:
     ```
     Authorized JavaScript origins:
     - https://madk-travel-blog.kandan4.xyz
     
     Authorized redirect URIs:
     - https://madk-travel-blog.kandan4.xyz/auth/google/callback
     ```

### Cloudflare Tunnel Configuration

1. **Update your Cloudflare tunnel config** to point to your Pi's IP:port 80

## 📱 Step 6: Testing Production

1. **Visit your domain:** https://madk-travel-blog.kandan4.xyz
2. **Should redirect to login page**
3. **Test authentication flow**
4. **Verify family member access**

## 🔒 Security Notes

1. **Environment Variables:**
   - Never commit `.env` files to git
   - Use strong, unique session secrets
   - Regularly rotate OAuth credentials

2. **Family Email Management:**
   - Keep ALLOWED_EMAILS list updated
   - Remove access for ex-family members
   - Test new additions

3. **SSL/HTTPS:**
   - Ensure Cloudflare has SSL enabled
   - Use secure cookies in production

## 🐛 Troubleshooting

### Common Issues

1. **"Email not authorized" error:**
   - Check ALLOWED_EMAILS in `.env`
   - Ensure email format matches exactly (lowercase)
   - Restart backend container after changes

2. **OAuth callback errors:**
   - Verify redirect URIs in Google Console
   - Check frontend/backend URL configuration
   - Ensure no trailing slashes in URLs

3. **Cannot reach backend:**
   - Check Docker container status: `docker compose ps`
   - Check logs: `docker compose logs backend`
   - Verify port forwarding

4. **Session issues:**
   - Clear browser cookies
   - Check session secret configuration
   - Verify Redis container is running

### Debug Commands

```bash
# Check container status
docker compose ps

# View backend logs
docker compose logs -f backend

# View frontend logs
docker compose logs -f frontend

# Restart specific service
docker compose restart backend

# Check backend health
curl http://localhost:3001/health
```

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review container logs
3. Verify all environment variables are set correctly
4. Test locally first before deploying to production

## 🎉 Success!

Once everything is working:
- Your travel blog is now protected by Google OAuth
- Only family members with whitelisted emails can access
- Users get a beautiful login experience
- Authentication persists across sessions
- Easy to manage family access through environment variables

Enjoy your private family travel diary! 🏝️✈️
