# 🏝️ Langkawi Travel Journal - Personal Vlog Companion

An interactive web application showcasing a 4-day Langkawi itinerary (June 16-19, 2025). Now featuring **Google OAuth authentication** to restrict access to family members only. Designed as a personal travel vlog aid with a modern, responsive interface.

---

## ✨ Core Features

*   **🔐 Family Authentication**: Google OAuth integration with email whitelisting
*   **📅 Daily Itinerary**: `langkawi.html` dynamically displays the travel schedule
*   **🗺️ Interactive Route Cards**: Clickable cards for each activity, linking to detailed route pages with embedded maps
*   **📱 Responsive Design**: Ensures a seamless experience on desktops, tablets, and mobile devices
*   **🎨 Modern UI**: Clean, visually appealing design with a consistent travel theme
*   **📄 Static Site**: Simple HTML, CSS, and JavaScript structure with Node.js backend for authentication
*   **🏠 Self-Hosted**: Runs on Raspberry Pi with Docker deployment

---

## � Quick Start

### For Developers

```bash
# Clone and setup
git clone <your-repo-url>
cd map

# Start development environment
npm run dev
```

### For Family Members
Simply visit the website and sign in with your Google account!

---

## 📚 Documentation

**Complete documentation is available in the [`documentation/`](./documentation/) folder:**

- **[📖 Documentation Index](./documentation/README.md)** - Start here for all guides
- **[🚀 Development Guide](./documentation/DEV_GUIDE.md)** - Local development setup  
- **[🚢 Deployment Guide](./documentation/DEPLOYMENT_GUIDE.md)** - Deploy to production
- **[🏗️ Project Overview](./documentation/PROJECT_OVERVIEW.md)** - Architecture and tech stack
- **[🔌 API Documentation](./documentation/API_DOCUMENTATION.md)** - Backend API reference

---

## 🔧 Technology Stack

### Frontend
- **HTML5, CSS3, Vanilla JavaScript** - No frameworks, lightweight and fast
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

### Backend
- **Node.js & Express** - Authentication server
- **Passport.js** - Google OAuth integration
- **Express Session** - Session storage

### Infrastructure
- **Docker** - Containerized deployment
- **Raspberry Pi** - Self-hosted hardware
- **Cloudflare** - CDN, SSL, and tunneling
- **Nginx** - Web server and reverse proxy

---

## 🗂️ Project Structure

```
map/
├── 📄 Frontend Files
│   ├── index.html              # Homepage
│   ├── login.html              # Authentication page
│   ├── langkawi.html          # Travel itinerary
│   └── css/, js/, images/     # Assets
├── 🖥️ Backend Service
│   └── backend/               # Authentication server
├── 🐳 Docker Configuration
│   ├── docker-compose.yml     # Service orchestration
│   └── Dockerfile             # Container definitions
├── � Documentation
│   └── documentation/         # All guides and docs
└── 🛠️ Development Tools
    ├── dev-server.js          # Local development
    ├── start-dev.sh           # Development script
    └── deploy.sh              # Deployment automation
```

---

## � Authentication System

- **Google OAuth 2.0** - Secure, familiar authentication
- **Family Whitelist** - Only authorized emails can access
- **Session Management** - Persistent, secure sessions
- **Privacy First** - Your family content stays private

---

## 🌐 Deployment

The project is designed for easy deployment with Docker containerization and supports various hosting options:

- **Self-hosted**: Raspberry Pi with Docker deployment
- **Cloudflare Integration**: SSL, CDN, and tunneling support
- **Container Architecture**: Frontend (Nginx) + Backend (Node.js) + Session Management

---

## 💡 Development Notes

- Keep styling and scripts minimal for easy maintenance
- Optimized for personal travel vlog creation
- Built with family privacy and security in mind
- Fully documented for easy setup and maintenance

**For detailed setup instructions, troubleshooting, and deployment guides, see the [documentation folder](./documentation/).**

---
