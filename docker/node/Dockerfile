FROM node:alpine

ARG VUE_APP_API_ENDPOINT
ENV VUE_APP_API_ENDPOINT=$VUE_APP_API_ENDPOINT

RUN apk update && \
  apk add --no-cache git curl && \
  curl -o- -L https://yarnpkg.com/install.sh | sh

RUN yarn global add @vue/cli && yarn global add @vue/cli-init && yarn global add @vue/cli-service