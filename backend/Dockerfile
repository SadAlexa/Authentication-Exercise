FROM node:23

ARG VERSION

ENV VERSION=$VERSION

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY backend/dist/src .

EXPOSE 3000

CMD ["npm", "start"]
