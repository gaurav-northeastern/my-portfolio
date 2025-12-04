#!/bin/sh
set -e

# Use PORT environment variable from Railway, default to 80 if not set
PORT=${PORT:-80}

# Replace placeholder in nginx config with actual PORT
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/conf.d/default.conf

# Start nginx
exec nginx -g 'daemon off;'
