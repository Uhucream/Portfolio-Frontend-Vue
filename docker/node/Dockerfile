FROM node:alpine

ARG VUE_APP_API_ENDPOINT
ENV VUE_APP_API_ENDPOINT=$VUE_APP_API_ENDPOINT

RUN apk update && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
  apk add --no-cache git curl chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont && \
  curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

RUN yarn global add @vue/cli && yarn global add @vue/cli-init && yarn global add @vue/cli-service