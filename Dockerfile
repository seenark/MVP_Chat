FROM node:14-alpine AS builder
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm install -g @vue/cli
RUN npm install
COPY . .
RUN chown -R node /usr/src/app
ARG VUE_APP_BASE_API_URL
ARG VUE_APP_BASE_WS_URL
ENV VUE_APP_BASE_API_URL=$VUE_APP_BASE_API_URL
ENV VUE_APP_BASE_WS_URL=$VUE_APP_BASE_WS_URL
RUN npm run build


FROM nginx
ARG builderSrc=/usr/src/app
COPY --from=builder ${builderSrc}/dist usr/share/nginx/html
COPY ./nginx/conf/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
