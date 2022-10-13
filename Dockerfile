FROM node:14.15.5-alpine

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./source/app/package.json ./source/app/
COPY ./source/resources/package.json ./source/resources/
COPY ./source/server/package.json ./source/server/
RUN yarn

COPY . .

# Build app
RUN yarn build

# Port
EXPOSE 3000

# Serve
CMD [ "yarn", "serve" ]