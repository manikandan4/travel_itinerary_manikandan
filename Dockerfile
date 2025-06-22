# Frontend Dockerfile (in your travel_itinerary_manikandan project root)

# Stage 2: Serve the static site with Nginx
FROM nginx:stable-alpine
LABEL maintainer="manikandan4"

# Remove the default Nginx configuration from the base image
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration for this site into the container
COPY madk-travel-blog-frontend.conf /etc/nginx/conf.d/madk-travel-blog-frontend.conf

# Copy the complete build output from the 'dist' directory into the Nginx web root
COPY dist/ /usr/share/nginx/html/

# Expose port 80 (this is the container's internal port)
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]