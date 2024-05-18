FROM node:alpine

WORKDIR /app
COPY . .

RUN yarn install

CMD ["yarn", "run", "build"]
