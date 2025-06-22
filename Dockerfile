# Frontend Dockerfile (in your travel_itinerary_manikandan project root on MacBook)

# Stage 1: Build the static site (if not already built)
# This stage is optional. If you always run 'npm run build' locally
# before running 'docker build', you can keep this stage commented out.
# If you uncomment it, make sure your 'package.json' and source files
# are in the same directory as this Dockerfile.
# FROM node:20 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build # Your specific build command that generates the 'dist' folder

# Stage 2: Serve the static site with Nginx
FROM nginx:stable-alpine 
LABEL maintainer="manikandan4"

# Remove the default Nginx configuration from the base image
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration for this site into the container
COPY madk-travel-blog-frontend.conf /etc/nginx/conf.d/madk-travel-blog-frontend.conf

# Copy the complete build output
COPY dist /usr/share/nginx/html

# Expose port 80 (this is the container's internal port)
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]