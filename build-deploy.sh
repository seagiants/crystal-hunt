#!/usr/bin/env bash

CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "\n"
echo -e "${CYAN}o - Cleaning staging dir${NC}"
rm -rf ./deploy/staging
mkdir deploy/staging

echo -e "${CYAN}o - Building client app${NC}"
yarn build
cp -a build/* deploy/staging/

echo -e "${CYAN}o - Adding package.json${NC}"
#cp deploy/app.yaml deploy/staging
cp package.json deploy/staging

echo -e "${CYAN}o - Building the server${NC}"
tsc ./deploy/server.ts --outDir ./deploy/staging/ --jsx react
mv ./deploy/staging/deploy/server.js ./deploy/staging/
rmdir ./deploy/staging/deploy

echo -e "${CYAN}o - Zipping the app${NC}"
cd ./deploy/staging
zip -r ch.zip *