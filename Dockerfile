FROM node:20.10.0 as node

WORKDIR /usr/src/app

COPY . .

RUN npm install --legacy-peer-deps && npm run build --prod

#stage 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /usr/src/app/dist/hotel-angular/browser /usr/share/nginx/html

EXPOSE 80