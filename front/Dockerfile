# Dev stage
FROM node:18.12 as dev

WORKDIR /react-app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]

# Build stage
FROM node:18.12 as build

WORKDIR /react-app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

# Serve it !
FROM nginx:1.19 as serve

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /react-app/build /usr/share/nginx/html