#!/bin/bash
set -e

# Update system
yum update -y

# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs git

# Install PM2
npm install -g pm2

# Clone the repo
cd /home/ec2-user
git clone https://github.com/xxcordeau/number-baseball-game.git app
cd app

# Install dependencies
cd server && npm ci && cd ..
cd client && npm ci && cd ..

# Build client
cd client && npx vite build && cd ..

# Build server
cd server && npx tsc && cd ..

# Start server with PM2
cd server
PORT=80 NODE_ENV=production pm2 start dist/index.js --name number-baseball
pm2 save
pm2 startup systemd -u ec2-user --hp /home/ec2-user

# Set ownership
chown -R ec2-user:ec2-user /home/ec2-user/app
