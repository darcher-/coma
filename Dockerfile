FROM node:14.15.5-alpine

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./pkg/app/package.json ./pkg/app/
COPY ./pkg/res/package.json ./pkg/res/
COPY ./pkg/svr/package.json ./pkg/svr/
RUN yarn

COPY . .

# Build app
RUN yarn build

# Port
EXPOSE 3000

# Serve
CMD [ "yarn", "serve" ]