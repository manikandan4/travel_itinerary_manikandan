# 🚀 Development Guide - MADK Travel Blog

## Quick Start Commands

### Start Full Development Environment
```bash
npm run dev
# or
./start-dev.sh
```
This starts both frontend (port 3000) and backend (port 3001) with authentication.

### Individual Services
```bash
# Frontend only (requires backend running separately)
npm run dev:frontend-only

# Backend only
npm run dev:backend-only

# Clean up ports if needed
./cleanup-ports.sh
```

## 📁 File Structure Overview

```
map/
├── backend/                 # Authentication backend
│   ├── server.js           # Main backend server
│   ├── package.json        # Backend dependencies
│   └── .env               # Backend configuration
├── dev-server.js           # Frontend dev server with proxy
├── start-dev.sh           # Main development script
├── cleanup-ports.sh       # Port cleanup utility
└── login.html            # Authentication login page
```

## 🔧 Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | **Start full dev environment** (frontend + backend) |
| `npm run start` | Same as `npm run dev` |
| `npm run dev:frontend-only` | Frontend server only (port 3000) |
| `npm run dev:backend-only` | Backend server only (port 3001) |
| `npm run build` | Build production assets |
| `./cleanup-ports.sh` | Kill processes on ports 3000 & 3001 |

## 🌐 Development URLs

- **Frontend**: http://localhost:3000
- **Login Page**: http://localhost:3000/login
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 🔐 Authentication Flow

1. User visits any protected page → Redirected to `/login`
2. Click "Continue with Google" → Backend handles OAuth
3. Google validates → Checks against family email whitelist
4. Success → Redirected back to main site with session

## 🛠️ Development Tips

### First Time Setup
1. Configure Google OAuth in Google Cloud Console
2. Update `backend/.env` with your credentials
3. Run `npm run dev`

### Port Conflicts
```bash
./cleanup-ports.sh
npm run dev
```

### Clear Authentication
- Clear browser cookies for localhost
- Or use incognito/private browsing

### Backend Environment
Make sure `backend/.env` has:
```env
GOOGLE_CLIENT_ID=your_real_client_id
GOOGLE_CLIENT_SECRET=your_real_client_secret
ALLOWED_EMAILS=your.email@gmail.com,family@gmail.com
SESSION_SECRET=some_random_string
```

## 🚀 Ready for Production?

When you're ready to deploy:
```bash
npm run build        # Build production assets
./deploy.sh main     # Deploy to Raspberry Pi
```

## ❓ Need Help?

- Check `GOOGLE_OAUTH_SETUP.md` for OAuth configuration
- Check `AUTHENTICATION_SETUP.md` for detailed setup guide
- Use `./cleanup-ports.sh` if ports are busy
- Try incognito mode for authentication issues
