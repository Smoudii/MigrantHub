FROM node:8

WORKDIR /usr/app
COPY package*.json ./
RUN npm install

COPY . .
ENV REACT_APP_FACEBOOK_APP_ID=392138771553696
ENV REACT_APP_GOOGLE_CLIENT_ID=779192502105-gi7pac25mhesrhjgrp353s0ofq5s11db.apps.googleusercontent.com
EXPOSE 3000
CMD [ "npm", "start" ]