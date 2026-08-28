#!/bin/bash
set -e

cd /home/ubuntu/portfolio

echo "Pulling latest code..."
git fetch origin
git reset --hard origin/main

echo "Installing frontend dependencies..."
cd /home/ubuntu/portfolio/client
npm ci

echo "Installing backend dependencies..."
cd /home/ubuntu/portfolio/server
npm ci

echo "Building portfolio..."
cd /home/ubuntu/portfolio
npm run build

echo "Deploying frontend to Apache..."
sudo find /var/www/html -mindepth 1 -maxdepth 1 -exec rm -rf {} +
sudo cp -r /home/ubuntu/portfolio/client/dist/. /var/www/html/

echo "Reloading Apache..."
sudo systemctl reload apache2

echo "Deployment complete."
