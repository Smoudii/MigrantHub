FROM node:8

WORKDIR /usr/app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000
EXPOSE 8080
CMD [ "npm", "start" ]