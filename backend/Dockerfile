FROM node:18.15-alpine AS development

RUN apk add tzdata

ENV TZ=Asia/Bangkok

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:18.15-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist


CMD ["node", "dist/main"]
