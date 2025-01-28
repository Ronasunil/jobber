FROM node:alpine:3.20 as build
WORKDIR /app

COPY src/ ./src
COPY package.json ./
COPY .npmrc ./
COPY tsconfig.json ./

RUN touch package.json && sed -i 's/"@Ronasunil/jobber-shared"/"@ronasunil/jobber-shared"/g' package.json
RUN npm i && npm i tsc -g

RUN npm run build


FROM node:apline:3.20
WORKDIR /app

COPY ./src ./src
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

RUN npm i --only=production && npm i pm2 -g

EXPOSE 2003

CMD [ "npm", "start" ]