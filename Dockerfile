FROM node:18-alpine
WORKDIR /dest
COPY package*.json /dest
RUN npm install --production
COPY ./src /dest
COPY swagger*.js* /
CMD [ "node","main.js"]
EXPOSE 3000
