FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js .
COPY test ./test

EXPOSE 5004

RUN npm test

CMD ["node", "server.js"]
