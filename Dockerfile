FROM node:14
RUN apt-get update && apt-get install -y vim wait-for-it

WORKDIR /collact/www

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

RUN chmod +x /collact/www/.docker/entrypoint.sh

EXPOSE 80
