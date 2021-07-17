FROM node:16-slim

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
