FROM node:8

WORKDIR /usr/app
COPY package*.json ./
RUN npm install

COPY . .
ENV MONGO_ATLAS=mongodb://mernuser:DvKLAu2heewbme4q@cluster0-shard-00-00-vhsbh.gcp.mongodb.net:27017,cluster0-shard-00-01-vhsbh.gcp.mongodb.net:27017,cluster0-shard-00-02-vhsbh.gcp.mongodb.net:27017/migranthub?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
ENV FACEBOOK_APP_ID=392138771553696
ENV FACEBOOK_APP_SECRET=e502c21e52ce6c62007d5e89b2c09c33
ENV GOOGLE_CLIENT_ID=779192502105-gi7pac25mhesrhjgrp353s0ofq5s11db.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=MlFkIZ-J-MoGRZfNUwi_HVH5
EXPOSE 5000
CMD [ "npm", "run", "dev" ]