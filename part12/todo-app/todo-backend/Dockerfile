FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production

USER node

CMD ["npm", "start"]
