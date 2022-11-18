FROM node:16.18.1

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]