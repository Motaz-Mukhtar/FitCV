#!/usr/bin/env bash


sudo apt update -y
sudo apt upgrade -y
# [Install Node.js]

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# [Database Postgres]
sudo apt install postgresql postgresql-contrib -y

sudo systemctl start postgresql
sudo systemctl enable postgresql

sudo -i -u postgres \

CREATE DATABASE fit_cv;\
CREATE ROLE fit_cv WITH LOGIN PASSWORD 'some_password';\
GRANT ALL PRIVILEGES ON DATABASE "my_app" TO fit_cv_role;

# [systemd]
# Create the Environment File
# Create a new file for your environment variables and open the file in Vim:

sudo vim /etc/app.env
# In Vim, add your variables in the format VARIABLE=value. For example:

export DB_PASSWORD=""

# Note
# to save and exit vim, press esc then :wq then enter

# Restrict the file permissions for security.
sudo chmod 600 /etc/app.env
sudo chown $$USERNAME:$$USERNAME /etc/app.env

# Create the systemd Service File
# Navigate to the systemd directory and create a new service file, fitcv.service.

sudo vim /etc/systemd/system/fitcv.service

# Define the service settings. Add the following content in Vim, modifying as needed for your application:
sudo printf %s "
[Unit]
Description=Node.js App
After=network.target multi-user.target

[Service]
User=$USERNAME
WorkingDirectory=/home/ubuntu/app
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/etc/app.env
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=fitcv

[Install]
WantedBy=multi-user.target

" > /etc/systemd/system/fitcv.service

# Reload systemd and start your service.

sudo systemctl daemon-reload
sudo systemctl enable fitcv.service
sudo systemctl start fitcv.service

# Verify that the service is running properly.

sudo systemctl status fitcv.service
# View Logs
sudo journalctl -u fitcv.service
# tail logs:
sudo journalctl -fu fitcv.service

# [Caddy]
# Install Caddy and forward incoming connections to port :3000
# https://caddyserver.com/docs/install

sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update -y
sudo apt install caddy -y

# sudo vim /etc/caddy/Caddyfile
sudo printf %s "
:80 {
    reverse_proxy localhost:3000
}" > /etc/caddy/Caddyfile

sudo systemctl restart caddy

# Configure Caddy to Use HTTPS
# Add a domain name for your server.

# AWS Route 53 Domain Name
# AWS Route 53 Domain Name

# Setup a custom domain name in route 53 to start creating dns records for services within aws. I'll show...

# 4 years ago
# Update the Caddyfile to use your domain name and enable HTTPS.

# sudo vim /etc/caddy/Caddyfile
# sudo printf %s "
# mydomain.com {
#     reverse_proxy localhost:3000
# }" > /etc/caddy/Caddyfile

# sudo systemctl restart caddy

