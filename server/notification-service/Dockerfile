FROM node:23-alpine3.20 as build
WORKDIR /app

COPY src/ ./src
COPY package.json ./
COPY tsconfig.json ./
COPY .npmrc ./

RUN npm i && npm i nodemon -g &&  npm install @ronasunil/jobber-shared@1.0.21 && npm i ts-node -g
RUN npm run build

FROM  node:23-alpine3.20
WORKDIR /app

COPY src/ ./src
COPY  --from=build /app/build /app

CMD [ "npm", "start" ]

