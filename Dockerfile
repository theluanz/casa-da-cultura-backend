FROM node:14.14.0-alpine3.12 as node

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]