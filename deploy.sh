#!/bin/bash

# --- Configuration ---
PI_USER="manikandan4"
PI_HOST="raspberrypi.local"
PI_REPO_PATH="/home/${PI_USER}/travel_itinerary_manikandan" # Where the git repo lives on Pi
PROJECT_ROOT_ON_PI="/home/${PI_USER}/docker/madk-travel-blog" # Where Docker assets will go
GIT_REPO_URL="https://github.com/manikandan4/travel_itinerary_manikandan.git"

# --- Branch Name (Defaults to 'main' if not provided as argument) ---
BRANCH_NAME=${1:-main}

# --- Error Handling ---
set -e # Exit immediately if any command fails.

echo "--- Starting Automated Full-Stack Docker Deployment ---"
echo "Deploying branch: ${BRANCH_NAME}"

# --- 1. (Skipped: Manual Git Push) ---
echo "➡️  Skipping Git push. Please ensure your desired branch ('${BRANCH_NAME}') is pushed to GitHub."
echo "   (e.g., git add . && git commit -m '...' && git push origin ${BRANCH_NAME})"
read -p "Press Enter to continue once the branch is pushed..."

# --- 2. Execute Deployment Steps on Raspberry Pi (via SSH) ---
echo "🚀 Connecting to Raspberry Pi to deploy full-stack application..."

# We pass the local variables as arguments to the remote script.
# This is safer than trying to expand them inside the heredoc.
# Note the 'EOF' is quoted to prevent any local shell expansion.
ssh "${PI_USER}@${PI_HOST}" 'bash -s' \
  "${BRANCH_NAME}" \
  "${PI_REPO_PATH}" \
  "${GIT_REPO_URL}" \
  "${PROJECT_ROOT_ON_PI}" <<'EOF'
set -e # Exit on error for the remote script too

# --- (Remote) Assign Arguments to Variables for Clarity ---
REMOTE_BRANCH_NAME="$1"
REMOTE_PI_REPO_PATH="$2"
REMOTE_GIT_REPO_URL="$3"
REMOTE_PROJECT_ROOT_ON_PI="$4"

echo "--- (Remote) Starting Deployment on Raspberry Pi ---"
echo "--- (Remote) Deploying branch: ${REMOTE_BRANCH_NAME}"

# --- (Remote) 1. Navigate to Project Directory & Update from Git ---
echo "1. Updating repository from Git..."
if [ -d "${REMOTE_PI_REPO_PATH}" ]; then
    cd "${REMOTE_PI_REPO_PATH}"
    git fetch origin
    git reset --hard "origin/${REMOTE_BRANCH_NAME}"
    git clean -fd
else
    echo "Cloning repository for the first time..."
    git clone "${REMOTE_GIT_REPO_URL}" "${REMOTE_PI_REPO_PATH}"
    cd "${REMOTE_PI_REPO_PATH}"
    git checkout "${REMOTE_BRANCH_NAME}"
fi
echo "Repository updated."

# --- (Remote) 2. Prepare Docker Assets ---
echo "2. Preparing Docker assets..."
mkdir -p "${REMOTE_PROJECT_ROOT_ON_PI}/backend"
cp -R "${REMOTE_PI_REPO_PATH}/backend" "${REMOTE_PROJECT_ROOT_ON_PI}/"
cp "${REMOTE_PI_REPO_PATH}/docker-compose.yml" "${REMOTE_PROJECT_ROOT_ON_PI}/"
cp "${REMOTE_PI_REPO_PATH}/madk-travel-blog-frontend.conf" "${REMOTE_PROJECT_ROOT_ON_PI}/"
echo "Docker assets copied."

# --- (Remote) 3. Handle Production .env File ---
ENV_FILE_PATH="${REMOTE_PROJECT_ROOT_ON_PI}/.env"
if [ ! -f "${ENV_FILE_PATH}" ]; then
    echo "⚠️  No .env file found on server. Creating one from template."
    echo "   >>> IMPORTANT: You must edit this file with your production secrets! <<<"
    # The 'ENVEOF' is quoted, so no variables inside are expanded. This is correct.
    cat > "${ENV_FILE_PATH}" <<'ENVEOF'
# Environment Variables for MADK Travel Blog Backend (Production)

# Server Configuration
NODE_ENV=production
PORT=3001

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_production_google_client_id_here
GOOGLE_CLIENT_SECRET=your_production_google_client_secret_here

# JWT Configuration
# This is a secret key for signing JWTs. Use a long, random string.
# Generate one with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Application URLs (MUST match your production domain)
FRONTEND_URL=https://madk-travel-blog.kandan4.xyz
BACKEND_URL=https://madk-travel-blog.kandan4.xyz

# Family Email Whitelist (comma-separated)
ALLOWED_EMAILS=famil_email1@gmail.com,famil_email2@gmail.com,famil_email3@gmail.com,famil_email4@gmail.com,famil_email5@gmail.com

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ENVEOF
    echo "✅ Template .env file created at ${ENV_FILE_PATH}"
    echo "   Please SSH into the Pi and edit it before the first run."
else
    echo "✅ Existing .env file found. Preserving it."
fi

# --- (Remote) 4. Build and Restart Docker Containers ---
echo "4. Building and restarting Docker containers..."
cd "${REMOTE_PROJECT_ROOT_ON_PI}"
docker compose down
docker compose build --no-cache backend # Rebuild backend to get new dependencies
docker compose up -d
echo "Docker containers are up and running."

# --- (Remote) 5. Clean Up Old Docker Images ---
echo "5. Cleaning up old Docker images..."
docker image prune -f
echo "Cleanup complete."

echo "--- (Remote) Deployment Finished ---"
EOF

echo "--- Automated Full-Stack Docker Deployment Finished! ---"
echo ""
echo "🎉 Your authenticated travel blog containers are deployed!"
echo "📱 Frontend should be available at your production URL shortly."
echo ""
echo "⚠️  IMPORTANT CONFIGURATION NOTES:"
echo ""
echo "📁 .env File Status on Raspberry Pi:"
echo "   - If .env existed: It was PRESERVED."
echo "   - If .env was missing: A new template was created. YOU MUST EDIT IT."
echo ""
echo "🔧 To manage .env on the Pi:"
echo "   ssh ${PI_USER}@${PI_HOST}"
echo "   nano ${PROJECT_ROOT_ON_PI}/.env"
echo ""
echo "🔑 Required .env values for production:"
echo "   - GOOGLE_CLIENT_ID (use your production credentials)"
echo "   - GOOGLE_CLIENT_SECRET (use your production credentials)"
echo "   - JWT_SECRET (generate a new strong secret for production)"
echo "   - FRONTEND_URL & BACKEND_URL (should match your domain)"
echo "   - ALLOWED_EMAILS"
echo ""
echo "🔍 To check logs:"
echo "   ssh ${PI_USER}@${PI_HOST}"
echo "   cd ${PROJECT_ROOT_ON_PI}"
echo "   docker compose logs -f backend"