FROM node:11-alpine

WORKDIR /usr/src/app

COPY ./deploy/staging/ ./

# yarn ?
RUN npm install

ENV SERVER_URL http://localhost:8081

EXPOSE 8081

CMD ["node", "server.js"]