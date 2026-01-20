FROM node:8.10.0-alpine as builder

RUN mkdir -p /usr/bin/app
WORKDIR /usr/bin/app

COPY package*.json /usr/bin/app/
RUN npm i --no-save

COPY . /usr/bin/app/

ARG BASE_URL=/
ENV BASE_URL=$BASE_URL

RUN npm run build


FROM nginx:1.13.10-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/bin/app/dist /usr/share/nginx/html
