#!/usr/bin/env bash

#cd ..

#npm run build

USERNAME="ubuntu"
IP="18.212.90.26"
REMOTE="$USERNAME@$IP:~/fit_cv_app"


DEPLOY_ITEMS="package.json"
#DEPLOY_ITEMS=""


# rsync -avz --exclude 'node_modules' --exclude 'scripts' --exclude '.git' --exclude '.env' \
# -e "ssh -i ~/.ssh/aws_ec2.pem" \
# . $USERNAME@$IP:~/app

cd ../

scp -i ~/.ssh/fit_cv_server.pem -r $DEPLOY_ITEMS "$REMOTE"
