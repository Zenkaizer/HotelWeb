# Stage 1: Build

FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build --prod

RUN ls -alt

# Stage 2: Serve

FROM nginx:1.25.3-alpine

COPY --from=build /usr/src/app/dist/hotel-angular /usr/share/nginx/html

COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80