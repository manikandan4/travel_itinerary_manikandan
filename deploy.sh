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
  
  # Copy built frontend files
  cp -R "${PI_REPO_PATH}/dist" "${PROJECT_ROOT_ON_PI}/dist"
  
  # Copy backend directory (ensure clean copy)
  rm -rf "${PROJECT_ROOT_ON_PI}/backend"
  cp -R "${PI_REPO_PATH}/backend" "${PROJECT_ROOT_ON_PI}/"

  echo "  - Creating environment file for backend (if not exists)..."
  if [ ! -f "${PROJECT_ROOT_ON_PI}/backend/.env" ]; then
    echo "    Creating .env file from production template..."
    cp "${PROJECT_ROOT_ON_PI}/backend/.env.production" "${PROJECT_ROOT_ON_PI}/backend/.env"
    echo "    ✅ Production .env created with Google OAuth and family emails configured"
    echo "    🔑 IMPORTANT: Update SESSION_SECRET in .env for security!"
  else
    echo "    ✅ .env file already exists, keeping current configuration"
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
echo "🎉 Your authenticated travel blog should be running!"
echo "📱 Frontend: https://${FRONTEND_IMAGE_NAME%%-*}.kandan4.xyz/"
echo "🔧 Backend API: Available internally on port 3001"
echo ""
echo "⚠️  IMPORTANT NEXT STEPS:"
echo "1. SSH into your Pi and configure the backend environment:"
echo "   ssh ${PI_USER}@${PI_HOST}"
echo "   nano ${PROJECT_ROOT_ON_PI}/backend/.env"
echo ""
echo "2. Set up Google OAuth credentials:"
echo "   - Go to: https://console.cloud.google.com/"
echo "   - Create OAuth 2.0 credentials"
echo "   - Add your domain to authorized origins"
echo "   - Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env"
echo ""
echo "3. Configure family email access:"
echo "   - Update ALLOWED_EMAILS in .env with family Gmail addresses"
echo ""
echo "4. Restart containers after configuration:"
echo "   docker compose restart"