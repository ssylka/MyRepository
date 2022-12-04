FROM node:8.10.0-alpine

ENV FLYWAY_VERSION 4.2.0
ENV FLYWAY_URL https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/${FLYWAY_VERSION}/flyway-commandline-${FLYWAY_VERSION}.tar.gz
RUN apk add --no-cache \
        bash \
        curl \
        openjdk8-jre \
        tar \
    && \
    curl -fL $FLYWAY_URL | tar -xzf - && \
    mv flyway-${FLYWAY_VERSION} /usr/bin/flyway
ENV PATH /usr/bin/flyway:$PATH

RUN mkdir -p /usr/bin/app
WORKDIR /usr/bin/app

COPY package*.json /usr/bin/app/
RUN npm i --no-save

COPY . /usr/bin/app/

CMD ["npm", "start"]
