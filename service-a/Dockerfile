FROM node:19
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD [ "node", "./dist/service-a.js" ]

