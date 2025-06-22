#!/bin/bash

# --- Configuration ---
PI_USER="manikandan4"
PI_HOST="raspberrypi.local"
PI_REPO_PATH="/home/${PI_USER}/travel_itinerary_manikandan" # Where the git repo lives on Pi
PROJECT_ROOT_ON_PI="/home/${PI_USER}/docker/madk-travel-blog" # Where Docker assets (Dockerfile, compose.yml) will go
GIT_REPO_URL="https://github.com/manikandan4/travel_itinerary_manikandan.git"
IMAGE_NAME="madk-travel-blog"

# --- Branch Name (Defaults to 'main' if not provided as argument) ---
BRANCH_NAME=${1:-main}

# --- Error Handling ---
set -e # Exit immediately if any command fails.

echo "--- Starting Automated Docker Deployment ---"
echo "Deploying branch: ${BRANCH_NAME}"

# --- 1. Build the Static Site Locally (on MacBook) ---
echo "1. Building static site locally (for initial verification and a clean 'dist' folder)..."
npm run build # Runs your 'build' script defined in package.json
echo "Static site built locally."

# --- 2. (Skipped: Manual Git Push) ---
# This script assumes your changes are already pushed to the GitHub branch.
echo "2. Skipping Git push. Please ensure your desired branch ('${BRANCH_NAME}') is pushed to GitHub."
echo "   (e.g., git add . && git commit -m '...' && git push origin ${BRANCH_NAME})"

# --- 3. Execute Deployment Steps on Raspberry Pi (via SSH) ---
echo "3. Connecting to Raspberry Pi to deploy Docker container (expect verbose output below)..."
ssh "${PI_USER}@${PI_HOST}" 'bash -s' << EOF
  set -e # Ensure commands within this SSH session exit immediately if any fail
  set -x # Enable shell debugging: prints each command before execution (useful for troubleshooting)

  echo "  - Navigating to or cloning repository on Pi..."
  if [ -d "${PI_REPO_PATH}" ]; then
    echo "    Repository already exists. Pulling latest changes from branch: ${BRANCH_NAME}..."
    cd "${PI_REPO_PATH}" || exit 1 # Change directory, exit if it fails
    git checkout "${BRANCH_NAME}" # Switch to the target branch
    git pull origin "${BRANCH_NAME}" # Pull latest changes for that branch
  else
    echo "    Cloning repository: ${GIT_REPO_URL} into ${PI_REPO_PATH}..."
    mkdir -p "$(dirname "${PI_REPO_PATH}")" # Create parent directory if needed
    git clone -b "${BRANCH_NAME}" "${GIT_REPO_URL}" "${PI_REPO_PATH}" # Clone specific branch
    cd "${PI_REPO_PATH}" || exit 1 # Change directory, exit if it fails
  fi

  echo "  - Stopping and disabling host Nginx service (if running), to avoid port conflicts with Docker..."
  sudo systemctl stop nginx || true # Stop Nginx service, '|| true' prevents script from failing if it's already stopped
  sudo systemctl disable nginx || true # Prevent Nginx from starting on boot
  echo "  - Host Nginx service ensured to be stopped and disabled."

  echo "  - Building static site on Pi (npm install & npm run build) to prepare content for Docker..."
  npm install # Install project dependencies
  npm run build # Build the 'dist' folder on the Pi
  echo "  - Static site rebuilt on Pi."

  echo "  - Creating Docker deployment directory: ${PROJECT_ROOT_ON_PI}..."
  mkdir -p "${PROJECT_ROOT_ON_PI}" # Create the directory for Docker build context

  echo "  - Copying Dockerfile, Nginx config, and site content ('dist' folder) to Docker build context..."
  cp "${PI_REPO_PATH}/Dockerfile" "${PROJECT_ROOT_ON_PI}/Dockerfile"
  cp "${PI_REPO_PATH}/madk-travel-blog.conf" "${PROJECT_ROOT_ON_PI}/madk-travel-blog.conf"
  cp -R "${PI_REPO_PATH}/dist" "${PROJECT_ROOT_ON_PI}/dist" # Recursively copy the 'dist' folder

  echo "  - Building Docker image with ':latest' tag on Pi (for ARM64)..."
  # This command builds the new image and tags it as 'latest'.
  # If a previous 'madk-travel-blog:latest' image existed, it becomes untagged/dangling.
  docker build -t "${IMAGE_NAME}:latest" "${PROJECT_ROOT_ON_PI}"

  echo "  - Copying 'docker-compose.yml' to deployment directory..."
  cp "${PI_REPO_PATH}/docker-compose.yml" "${PROJECT_ROOT_ON_PI}/docker-compose.yml"

  echo "  - Changing to Docker deployment directory: ${PROJECT_ROOT_ON_PI}..."
  cd "${PROJECT_ROOT_ON_PI}" || exit 1 # Change directory, exit if it fails

  echo "  - Deploying Docker Compose stack (this will update to the new 'latest' image)..."
  # '--remove-orphans' removes containers for services not defined in the compose file (good for cleanup)
  docker compose up -d --remove-orphans

  echo "  - Cleaning up old (dangling) Docker images to save disk space..."
  # 'docker image prune -f' removes all untagged images.
  # This includes any previous 'latest' images that became untagged after a new build.
  docker image prune -f

EOF

echo "--- Automated Docker Deployment Finished! ---"
echo "Your site should be updated and accessible at: https://${IMAGE_NAME}.kandan4.xyz/"