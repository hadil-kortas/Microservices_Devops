FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 5001

RUN npm test

CMD ["node", "server.js"]
