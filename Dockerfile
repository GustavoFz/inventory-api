FROM node:16-alpine

WORKDIR /usr/src/

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "start" ]