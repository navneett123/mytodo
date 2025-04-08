# Use official Nginx image
FROM nginx:alpine

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy app files to nginx html folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx (handled by default command)
