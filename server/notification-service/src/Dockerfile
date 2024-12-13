FROM node:23-alpine3.20 as builder

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY .npmrc ./
COPY .src ./src
RUN npm install  && npm install @ronasunil/jobber-shared@1.0.21 && npm install -g ts-node
RUN npm run build

FROM node:23-alpine3.20

WORKDIR /app
COPY --from=builder /app /app
EXPOSE 4001
CMD [ "npm" "start" ]
