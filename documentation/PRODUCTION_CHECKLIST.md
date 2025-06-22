# 🚀 Production Deployment Checklist

## ✅ Pre-Deployment Requirements

### 1. Google OAuth Configuration (CRITICAL)
**Update your Google Cloud Console BEFORE deployment:**

1. Go to: https://console.cloud.google.com/
2. Navigate to: APIs & Services > Credentials
3. Edit your OAuth 2.0 Client ID
4. Add production URLs:
   - **Authorized JavaScript origins**: `https://your-domain.com`
   - **Authorized redirect URIs**: `https://your-domain.com/auth/google/callback`
5. Save and wait 15 minutes for changes to propagate

### 2. Environment Setup ✅
- Docker and Docker Compose installed on your server
- Cloudflare tunnel configured for your domain
- SSL/HTTPS enabled

---

## 🚀 Quick Deployment

### Step 1: Deploy
```bash
cd /path/to/your/project
./deploy.sh main
```

### Step 2: Configure Environment
```bash
# SSH to your server
ssh user@your-server

# Navigate and configure
cd /path/to/docker/project/backend
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"  # Generate session secret
nano .env  # Add the session secret and verify all settings
```

### Step 3: Restart and Verify
```bash
cd /path/to/docker/project
docker compose restart backend
docker compose ps  # Check all containers are running
curl http://localhost:3001/health  # Test backend health
```

---

## 🏗️ How It Works

Your setup uses a **single-domain architecture**:

1. **Cloudflare tunnel** → **Port 80** → **Frontend container (Nginx)**
2. **Frontend Nginx** proxies `/auth/*` and `/api/*` → **Backend container**
3. **Backend** handles OAuth and returns responses through the proxy
4. **Everything** uses the same domain for seamless authentication

**✅ No additional backend exposure needed!**

---

## 🔍 Production Testing Checklist

## ✅ Testing Checklist

### Authentication Flow:
1. Visit your domain → Should redirect to login
2. Click "Login with Google" → Should show Google account chooser  
3. Sign in with family email → Should redirect to main site
4. Check navbar → Should show user name and logout

### Family Access:
- Test each family email address
- Test non-family email (should be denied)
- Test logout and session persistence

---

## � Troubleshooting

| Issue | Solution |
|-------|----------|
| **OAuth fails** | Check Google Console URLs, wait 15 min after changes |
| **Can't access site** | Check Cloudflare tunnel, verify containers running |
| **Family can't login** | Check `ALLOWED_EMAILS` in backend/.env |
| **502 errors** | Check backend container status and logs |

### Quick Debug:
```bash
docker compose ps                    # Check container status
docker compose logs backend          # Check backend logs  
curl http://localhost:3001/health    # Test backend health
docker compose restart              # Restart all services
```

---

## 🎉 Success!

Your travel blog is now live with:
- ✅ **Secure authentication** via Google OAuth
- ✅ **Family-only access** with email whitelist  
- ✅ **Self-hosted** on your infrastructure
- ✅ **Worldwide access** via Cloudflare

**Your family can now securely access the travel blog!**
