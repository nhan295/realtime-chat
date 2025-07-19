FROM node:18
WORKDIR /app

COPY server/package*.json ./
RUN npm install

# copy toàn bộ client + server
COPY  server ./server
COPY client ./client

WORKDIR /app/server

EXPOSE 3000
CMD ["npm", "server.js"]
