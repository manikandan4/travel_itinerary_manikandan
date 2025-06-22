#!/bin/bash

# --- Configuration ---
PI_USER="manikandan4"
PI_HOST="raspberrypi.local" #
PI_REPO_PATH="/home/${PI_USER}/travel_itinerary_manikandan" # Where the repo will be cloned/updated on Pi
PROJECT_ROOT_ON_PI="/home/${PI_USER}/docker/madk-travel-blog" # Where compose file will live on Pi
GIT_REPO_URL="https://github.com/manikandan4/travel_itinerary_manikandan.git"
IMAGE_NAME="madk-travel-blog"

# --- Branch Name (Default to 'main' if not provided) ---
# run the script as: ./deploy.sh my-feature-branch
# Or it will default to 'main'
BRANCH_NAME=${1:-main} # Use the first argument if provided, else default to 'main'

# --- Error Handling ---
set -e # Exit immediately if a command exits with a non-zero status.

echo "--- Starting Deployment ---"
echo "Deploying from branch: ${BRANCH_NAME}"

# --- 1. Build the Static Site Locally (on MacBook) ---
# This is mainly for your local testing
# It's not strictly necessary for the remote build, but good for confidence.
echo "1. Building static site locally (for verification)..."
npm run build # Or your specific build command
echo "Static site built locally."

# --- 2. (Skipped: Manual Git Push) ---
# You will manually git add, commit, and push the desired branch before running this script.
echo "2. Skipping Git push. Please ensure your desired branch ('${BRANCH_NAME}') is pushed to GitHub."
echo "   (e.g., git add . && git commit -m '...' && git push origin ${BRANCH_NAME})"

# --- 3. Execute Deployment on Raspberry Pi via SSH ---
echo "3. Connecting to Raspberry Pi for deployment..."
ssh ${PI_USER}@${PI_HOST} << EOF
  set -e # Ensure commands within SSH session also exit on error

  echo "  - Navigating to or cloning repository on Pi..."
  if [ -d "${PI_REPO_PATH}" ]; then
    echo "    Repository already exists. Pulling latest changes from branch: ${BRANCH_NAME}..."
    cd ${PI_REPO_PATH}
    git checkout ${BRANCH_NAME} # Switch to the target branch
    git pull origin ${BRANCH_NAME} # Pull latest changes for that branch
  else
    echo "    Cloning repository: ${GIT_REPO_URL} into ${PI_REPO_PATH}..."
    mkdir -p $(dirname ${PI_REPO_PATH})
    git clone -b ${BRANCH_NAME} ${GIT_REPO_URL} ${PI_REPO_PATH} # Clone specific branch
    cd ${PI_REPO_PATH}
  fi

  echo "  - Stopping and disabling old Nginx host service (if running)..."
  sudo systemctl stop nginx || true
  sudo systemctl disable nginx || true
  echo "  - Old Nginx service stopped and disabled."


  echo "  - Building static site on Pi (npm install & npm run build)..."
  npm install # Ensure dependencies are installed
  npm run build # Build the dist folder on the Pi
  echo "  - Static site built on Pi."

  # Ensure the Docker deployment directory exists
  echo "  - Creating Docker deployment directory: ${PROJECT_ROOT_ON_PI}..."
  mkdir -p ${PROJECT_ROOT_ON_PI}

  # Copy Dockerfile and Nginx config from repo to the deployment directory for Docker build context
  cp ${PI_REPO_PATH}/Dockerfile ${PROJECT_ROOT_ON_PI}/Dockerfile
  cp ${PI_REPO_PATH}/madk-travel-blog.conf ${PROJECT_ROOT_ON_PI}/madk-travel-blog.conf
  # Recursively copy the dist folder too
  cp -R ${PI_REPO_PATH}/dist ${PROJECT_ROOT_ON_PI}/dist

  echo "  - Building Docker image on Pi (for ARM64) with new version tag..."
  NEW_VERSION_ON_PI=$(date +"%Y%m%d-%H%M%S")
  docker build -t ${IMAGE_NAME}:${NEW_VERSION_ON_PI} ${PROJECT_ROOT_ON_PI}

  echo "  - Removing old 'latest' tag and tagging new image as 'latest'..."
  docker rmi ${IMAGE_NAME}:latest || true
  docker tag ${IMAGE_NAME}:${NEW_VERSION_ON_PI} ${IMAGE_NAME}:latest

  echo "  - Copying docker-compose.yml from repo to deployment directory..."
  cp ${PI_REPO_PATH}/docker-compose.yml ${PROJECT_ROOT_ON_PI}/docker-compose.yml

  echo "  - Changing to deployment directory: ${PROJECT_ROOT_ON_PI}..."
  cd ${PROJECT_ROOT_ON_PI}

  echo "  - Deploying Docker Compose stack (this will update to the new 'latest')..."
  docker compose up -d --remove-orphans

  echo "  - Pruning old Docker images (keeps last 3 non-latest versions)..."
  rm -f ~/${IMAGE_NAME}-*.tar || true # Remove old tar files, if any, from previous manual methods
  
  ALL_BLOG_IMAGES=$(docker images --format "{{.Tag}}" "${IMAGE_NAME}" | grep -v "latest" | sort -r)
  
  KEEP_VERSIONS=$(echo "${ALL_BLOG_IMAGES}" | head -n 3)
  
  for old_tag in ${ALL_BLOG_IMAGES}; do
      if ! echo "${KEEP_VERSIONS}" | grep -q "${old_tag}"; then
          echo "    - Removing old image: ${IMAGE_NAME}:${old_tag}"
          docker rmi ${IMAGE_NAME}:${old_tag} || echo "      (Could not remove ${IMAGE_NAME}:${old_tag}, possibly in use)"
      fi
  done
  
EOF

echo "--- Deployment Finished! ---"
echo "Access your site at: https://${IMAGE_NAME}.kandan4.xyz/"