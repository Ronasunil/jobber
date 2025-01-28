FROM node:alpine:3.20 as build
WORKDIR /app

COPY src ./src
COPY package.json ./
COPY tsconfig.json ./
COPY .npmrc ./
RUN touch package.json && \
    sed -i 's/"@Ronasunil/jobber-shared"/"@ronasunil/jobber-shared"/g' package.json

RUN npm run build

FROM node:alpine:3.20
WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/src ./src

RUN npm install --only=production && npm i -g pm2

EXPOSE  2002

CMD [ "npm", "start" ]