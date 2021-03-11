FROM node:15
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "run", "dev" ]
