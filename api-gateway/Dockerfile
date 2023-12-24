FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js .

EXPOSE 5004

CMD ["node", "server.js"]
