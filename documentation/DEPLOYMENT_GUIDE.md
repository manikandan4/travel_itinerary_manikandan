# 🚢 Deployment Guide - MADK Travel Blog

## 🎯 Overview

This guide covers deploying your authenticated travel blog to a Raspberry Pi using Docker, with Cloudflare tunnel for internet access.

## 🎯 Critical Production Update for Authentication

**⚠️ BEFORE DEPLOYMENT:** Your authentication system is now ready for production, but requires **ONE CRITICAL STEP**:

### 🔑 Google OAuth Production URLs (MANDATORY)

**You MUST update Google Cloud Console before deploying:**

1. **Go to:** https://console.cloud.google.com/
2. **Navigate to:** APIs & Services > Credentials  
3. **Edit your OAuth 2.0 Client ID**
4. **Add to Authorized JavaScript origins:**
   ```
   https://madk-travel-blog.kandan4.xyz
   ```
5. **Add to Authorized redirect URIs:**
   ```
   https://madk-travel-blog.kandan4.xyz/auth/google/callback
   ```
6. **Save and wait 15 minutes for Google to propagate changes**

**Why this works:** Your Nginx configuration proxies `/auth/*` requests to the backend container, so OAuth uses the same domain as your frontend.

---

## 🔧 Prerequisites

### Hardware & Software
- Raspberry Pi (4GB+ RAM recommended)
- Docker and Docker Compose installed on Pi
- Cloudflare account and tunnel configured
- Domain/subdomain pointing to your Pi

### Development Complete
- ✅ Local development working
- ✅ Google OAuth configured
- ✅ Family emails tested
- ✅ Authentication flow verified

## 🚀 Deployment Process

### Step 1: Prepare Environment Files

**On your Raspberry Pi**, create the production environment:

```bash
ssh your_user@raspberrypi.local
cd /home/your_user/docker/madk-travel-blog/backend
cp .env.example .env
nano .env
```

**Production .env configuration:**
```env
NODE_ENV=production
PORT=3001

# Google OAuth (same as development)
GOOGLE_CLIENT_ID=your_actual_google_client_id
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret

# Production URLs - CRITICAL: Backend URL must match frontend domain!
FRONTEND_URL=https://madk-travel-blog.kandan4.xyz
BACKEND_URL=https://madk-travel-blog.kandan4.xyz

# Family Email Whitelist
ALLOWED_EMAILS=family1@gmail.com,family2@gmail.com,family3@gmail.com

# Production Session Secret (generate new one)
SESSION_SECRET=production_secret_different_from_dev

# Redis for session storage
REDIS_URL=redis://redis:6379

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 2: Update Google OAuth for Production

**In Google Cloud Console:**

1. Go to **APIs & Services** > **Credentials**
2. Edit your OAuth 2.0 Client ID
3. Update **Authorized JavaScript origins:**
   ```
   https://madk-travel-blog.kandan4.xyz
   ```
4. Update **Authorized redirect URIs:**
   ```
   https://madk-travel-blog.kandan4.xyz/auth/google/callback
   ```

### Step 3: Deploy with Automated Script

**From your MacBook:**

```bash
cd /Users/manikandan/Work/JS_workspace/TravelDiary/map

# Build and deploy
./deploy.sh main
```

**What the deployment script does:**
1. 🏗️ Builds static site locally
2. 📤 Pushes changes to Git (if needed)
3. 🐧 SSH into Raspberry Pi
4. 📥 Pulls latest code
5. 🏗️ Rebuilds on Pi
6. 🐳 Builds Docker images
7. 🚀 Deploys with Docker Compose
8. 🧹 Cleans up old images

### Step 4: Verify Deployment

**Check container status:**
```bash
ssh your_user@raspberrypi.local
cd /home/your_user/docker/madk-travel-blog
docker compose ps
```

**Expected output:**
```
NAME                          STATUS        PORTS
madk-travel-blog-backend      Up (healthy)  3001/tcp
madk-travel-blog-frontend     Up            0.0.0.0:80->80/tcp
madk-travel-blog-redis        Up            6379/tcp
```

**Check logs:**
```bash
# Backend logs
docker compose logs -f backend

# Frontend logs  
docker compose logs -f frontend

# All logs
docker compose logs -f
```

## 🌐 Cloudflare Configuration

### Tunnel Setup
1. **Install cloudflared** on your Raspberry Pi
2. **Create tunnel:** `cloudflared tunnel create madk-blog`
3. **Configure tunnel** to point to `localhost:80`
4. **Update DNS** to point your domain to the tunnel

### SSL/Security
- ✅ Cloudflare handles SSL automatically
- ✅ Set SSL mode to "Full (strict)"
- ✅ Enable "Always Use HTTPS"
- ✅ Configure security settings as needed

## 🔧 Maintenance Commands

### Update Deployment
```bash
# From MacBook
./deploy.sh main
```

### Restart Services
```bash
# On Raspberry Pi
cd /home/your_user/docker/madk-travel-blog
docker compose restart
```

### View Logs
```bash
docker compose logs -f backend
docker compose logs -f frontend
```

### Clean Up
```bash
# Remove old images
docker image prune -f

# Remove unused containers
docker container prune -f
```

### Update Family Access
```bash
# Edit environment file
nano backend/.env

# Update ALLOWED_EMAILS
# Restart backend
docker compose restart backend
```

## 🐛 Troubleshooting

### Common Issues

**1. OAuth Errors in Production**
- ✅ Check Google Console URLs match production domain
- ✅ Wait 15 minutes after Google Console changes
- ✅ Clear browser cache
- ✅ Check backend logs for OAuth errors

**2. Cannot Access Website**
- ✅ Check Cloudflare tunnel status
- ✅ Verify DNS configuration
- ✅ Check container status: `docker compose ps`
- ✅ Check frontend logs: `docker compose logs frontend`

**3. Authentication Not Working**
- ✅ Check backend environment variables
- ✅ Verify family emails in ALLOWED_EMAILS
- ✅ Check backend logs: `docker compose logs backend`
- ✅ Test backend health: `curl http://localhost:3001/health`

**4. 502 Bad Gateway**
- ✅ Backend container not running
- ✅ Check backend logs for startup errors
- ✅ Verify environment configuration
- ✅ Check Redis container status

### Debug Commands

```bash
# Check container health
docker compose ps

# Test backend directly
curl http://localhost:3001/health

# Check environment
docker compose exec backend printenv | grep GOOGLE

# Restart specific service
docker compose restart backend

# View real-time logs
docker compose logs -f backend
```

## 🔒 Security Considerations

### Production Security
- ✅ Use strong session secrets
- ✅ Enable rate limiting
- ✅ Keep family email list updated
- ✅ Regular security updates
- ✅ Monitor access logs

### Environment Variables
- ✅ Never commit `.env` files
- ✅ Use different secrets for production
- ✅ Rotate credentials periodically
- ✅ Backup environment configuration

## 📊 Monitoring

### Health Checks
- **Backend Health**: `https://your-domain.com/health`
- **Container Status**: `docker compose ps`
- **Logs**: `docker compose logs`

### Performance
- Monitor memory usage: `docker stats`
- Check disk space: `df -h`
- Network status via Cloudflare dashboard

## 🎉 Success!

Once deployed successfully:
- ✅ Your family travel blog is live
- ✅ Only authorized family members can access
- ✅ Secure authentication via Google OAuth
- ✅ Self-hosted on your Raspberry Pi
- ✅ Accessible worldwide via Cloudflare

**Your travel blog is now live at:** `https://madk-travel-blog.kandan4.xyz` 🎊

---

*Need help? Check the troubleshooting section or review the authentication setup guide.*
