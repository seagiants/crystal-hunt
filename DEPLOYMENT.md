# Variables

* target server, that could change depending on env var (see app engine app.yaml env-vars key)

# Build

* yarn build
* rm -rf /deploy/staging
* cp -a build/\* deploy/staging/
* cp deploy/app.yaml deploy/staging/
* cp package.json deploy/staging/
* tsc ./deploy/server.ts --outDir ./deploy/staging/ --jsx react
* ? manually change ../src/Game to ./src/Game in server.js

# Deploy

* cd /deploy/staging
* gcloud app deploy
* YO!
