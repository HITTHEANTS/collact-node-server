FROM node:14.15-buster

RUN apt-get update && apt-get install -y wait-for-it

COPY . .

RUN npm install

RUN npm run build

RUN npm run migration:run
