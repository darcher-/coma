FROM node:14.15.5-alpine

ENV COMA /usr/src
WORKDIR $COMA

COPY ["package.json", "yarn.lock", "package-lock.json", "$COMA/"]
COPY ["pkgs/app/package.json", "$COMA/app"]
COPY ["pkgs/api/package.json", "$COMA/api"]
COPY ["pkgs/lib/package.json", "$COMA/lib"]
RUN yarn

COPY . .

# Build app
RUN ["yarn", "log"]
RUN ["yarn", "build"]

# Port
EXPOSE 8080

# Serve
CMD ["yarn", "serve"]