#!/bin/bash

# --- Configuration ---
PI_USER="manikandan4"
PI_HOST="raspberrypi.local"
PI_REPO_PATH="/home/${PI_USER}/travel_itinerary_manikandan" # Where the git repo lives on Pi
PROJECT_ROOT_ON_PI="/home/${PI_USER}/docker/madk-travel-blog" # Where Docker assets will go
GIT_REPO_URL="https://github.com/manikandan4/travel_itinerary_manikandan.git"
FRONTEND_IMAGE_NAME="madk-travel-blog-frontend"
BACKEND_IMAGE_NAME="madk-travel-blog-backend"

# --- Branch Name (Defaults to 'main' if not provided as argument) ---
BRANCH_NAME=${1:-main}

# --- Error Handling ---
set -e # Exit immediately if any command fails.

echo "--- Starting Automated Full-Stack Docker Deployment ---"
echo "Deploying branch: ${BRANCH_NAME}"

# --- 1. Build the Static Site Locally (on MacBook) ---
echo "1. Building static site locally..."
npm run build # Runs your 'build' script defined in package.json
echo "Static site built locally."

# --- 2. (Skipped: Manual Git Push) ---
echo "2. Skipping Git push. Please ensure your desired branch ('${BRANCH_NAME}') is pushed to GitHub."
echo "   (e.g., git add . && git commit -m '...' && git push origin ${BRANCH_NAME})"

# --- 3. Execute Deployment Steps on Raspberry Pi (via SSH) ---
echo "3. Connecting to Raspberry Pi to deploy full-stack application..."
ssh "${PI_USER}@${PI_HOST}" 'bash -s' << EOF
  set -e # Ensure commands within this SSH session exit immediately if any fail
  set -x # Enable shell debugging: prints each command before execution

  echo "  - Navigating to or cloning repository on Pi..."
  if [ -d "${PI_REPO_PATH}" ]; then
    echo "    Repository already exists. Pulling latest changes from branch: ${BRANCH_NAME}..."
    cd "${PI_REPO_PATH}" || exit 1
    git checkout "${BRANCH_NAME}"
    git pull origin "${BRANCH_NAME}"
  else
    echo "    Cloning repository: ${GIT_REPO_URL} into ${PI_REPO_PATH}..."
    mkdir -p "$(dirname "${PI_REPO_PATH}")"
    git clone -b "${BRANCH_NAME}" "${GIT_REPO_URL}" "${PI_REPO_PATH}"
    cd "${PI_REPO_PATH}" || exit 1
  fi

  echo "  - Stopping and disabling host Nginx service (if running)..."
  sudo systemctl stop nginx || true
  sudo systemctl disable nginx || true
  echo "  - Host Nginx service ensured to be stopped and disabled."

  echo "  - Building static site on Pi (npm install & npm run build)..."
  npm install
  npm run build
  echo "  - Static site rebuilt on Pi."

  echo "  - Creating Docker deployment directory: ${PROJECT_ROOT_ON_PI}..."
  mkdir -p "${PROJECT_ROOT_ON_PI}"

  echo "  - Copying Docker assets to deployment directory..."
  # Copy main docker files
  cp "${PI_REPO_PATH}/docker-compose.yml" "${PROJECT_ROOT_ON_PI}/docker-compose.yml"
  cp "${PI_REPO_PATH}/Dockerfile" "${PROJECT_ROOT_ON_PI}/Dockerfile"
  cp "${PI_REPO_PATH}/madk-travel-blog-frontend.conf" "${PROJECT_ROOT_ON_PI}/madk-travel-blog-frontend.conf"
  
  # Copy complete build output (includes all files)
  cp -R "${PI_REPO_PATH}/dist" "${PROJECT_ROOT_ON_PI}/dist"
  
  # Copy backend directory (ensure clean copy)
  rm -rf "${PROJECT_ROOT_ON_PI}/backend"
  cp -R "${PI_REPO_PATH}/backend" "${PROJECT_ROOT_ON_PI}/"

  echo "  - Checking backend environment file (.env)..."
  if [ -f "${PROJECT_ROOT_ON_PI}/backend/.env" ]; then
    echo "    ✅ .env file already exists - PRESERVING current configuration"
    echo "    📝 Your existing Google OAuth credentials and settings will NOT be overwritten"
    echo "    🔧 To update manually: ssh ${PI_USER}@${PI_HOST} && cd ${PROJECT_ROOT_ON_PI}/backend && nano .env"
  else
    echo "    Creating new .env file from template..."
    if [ -f "${PROJECT_ROOT_ON_PI}/backend/.env.example" ]; then
      cp "${PROJECT_ROOT_ON_PI}/backend/.env.example" "${PROJECT_ROOT_ON_PI}/backend/.env"
      echo "    ✅ .env created from .env.example template"
    else
      # Create a basic .env file with required variables
      cat > "${PROJECT_ROOT_ON_PI}/backend/.env" << 'ENVEOF'
# Environment Variables for MADK Travel Blog Backend

# Server Configuration
NODE_ENV=production
PORT=3001

# Google OAuth Configuration
# Get these from Google Cloud Console: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Session Configuration
SESSION_SECRET=generate_a_secure_random_string_here

# Application URLs
FRONTEND_URL=https://your-domain.com
BACKEND_URL=https://your-domain.com

# Family Email Whitelist (comma-separated)
ALLOWED_EMAILS=family1@gmail.com,family2@gmail.com

# Security Settings
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Additional Production Settings
TRUST_PROXY=true
ENVEOF
      echo "    ✅ Basic .env template created"
    fi
    echo "    🔑 IMPORTANT: Edit .env with your actual Google OAuth credentials!"
  fi

  echo "  - Building Docker images on Pi..."
  cd "${PROJECT_ROOT_ON_PI}" || exit 1
  
  # Build frontend image
  docker build -t "${FRONTEND_IMAGE_NAME}:latest" .
  
  # Build backend image  
  docker build -t "${BACKEND_IMAGE_NAME}:latest" ./backend

  echo "  - Stopping existing containers..."
  docker compose down || true

  echo "  - Deploying full-stack application with Docker Compose..."
  docker compose up -d --remove-orphans

  echo "  - Cleaning up old Docker images..."
  docker image prune -f

  echo "  - Checking container status..."
  docker compose ps

EOF

echo "--- Automated Full-Stack Docker Deployment Finished! ---"
echo ""
echo "🎉 Your authenticated travel blog containers are deployed!"
echo "📱 Frontend: https://your-domain.com/"
echo "🔧 Backend API: Available internally on port 3001"
echo ""
echo "⚠️  IMPORTANT CONFIGURATION NOTES:"
echo ""
echo "📁 .env File Status:"
echo "   - If .env exists: PRESERVED (your credentials safe)"
echo "   - If .env missing: Created from template (needs configuration)"
echo ""
echo "🔧 To update .env manually (if needed):"
echo "   ssh ${PI_USER}@${PI_HOST}"
echo "   cd ${PROJECT_ROOT_ON_PI}/backend"
echo "   nano .env"
echo ""
echo "🔑 Required .env values (only if using new template):"
echo "   - GOOGLE_CLIENT_ID=your_actual_client_id"
echo "   - GOOGLE_CLIENT_SECRET=your_actual_client_secret"
echo "   - SESSION_SECRET=\$(node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\")"
echo "   - FRONTEND_URL=https://your-actual-domain.com"
echo "   - BACKEND_URL=https://your-actual-domain.com"
echo "   - ALLOWED_EMAILS=family1@gmail.com,family2@gmail.com"
echo ""
echo "🔄 Restart backend after any .env changes:"
echo "   cd ${PROJECT_ROOT_ON_PI}"
echo "   docker compose restart backend"
echo ""
echo "✅ Verify deployment:"
echo "   docker compose ps"
echo "   curl http://localhost:3001/health"