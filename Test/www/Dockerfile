FROM node:8.10.0-alpine as builder

RUN mkdir -p /usr/bin/app
WORKDIR /usr/bin/app

COPY package*.json /usr/bin/app/
RUN npm i --no-save

COPY . /usr/bin/app/

RUN npm run build


FROM nginx:1.13.10-alpine

COPY --from=builder /usr/bin/app/www /usr/share/nginx/html
