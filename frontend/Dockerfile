FROM node:23 AS build

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY frontend/dist/ ./

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]