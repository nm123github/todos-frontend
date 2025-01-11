FROM node:18-alpine

RUN corepack enable \
    && corepack prepare yarn@4.5.3 --activate

WORKDIR /app

COPY . .

RUN yarn install --immutable

RUN yarn run build

CMD ["yarn", "run", "serve:prod"]
