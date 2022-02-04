FROM node:16-alpine3.14
WORKDIR /usr/src/app

RUN apk update && apk add netcat-openbsd
RUN wget -q https://raw.githubusercontent.com/eficode/wait-for/v2.2.1/wait-for
RUN chmod +x ./wait-for

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]