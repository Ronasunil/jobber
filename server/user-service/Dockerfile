FROM node:22-alpine3.20 as build
WORKDIR /app

COPY src/ ./src
COPY package.json ./
COPY .npmrc ./
COPY tsconfig.json ./

RUN sed -i 's/"npm:@Ronasunil\/jobber-shared@/\"npm:@ronasunil\/jobber-shared@/g' package.json
RUN npm install -g npm@11.0.0
RUN npm i && npm i tsc -g

RUN npm run build

FROM node:22-alpine3.20
WORKDIR /app

COPY ./src ./src
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/.npmrc ./

RUN npm i --omit=dev && npm i -g pm2

EXPOSE 2003

CMD [ "npm", "start" ]
