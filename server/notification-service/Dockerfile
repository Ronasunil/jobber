FROM node:22-alpine3.20 AS build
WORKDIR /app

COPY src/ ./src
COPY package.json ./
COPY package-lock.json ./
ARG NPM_TOKEN
RUN echo "@ronasunil:registry=https://npm.pkg.github.com" > .npmrc \
    && echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
COPY tsconfig.json ./

RUN sed -i 's/"npm:@Ronasunil\/jobber-shared@/\"npm:@ronasunil\/jobber-shared@/g' package.json
RUN npm install -g npm@11.0.0
RUN npm ci
RUN npm i -g tsc

RUN npm run build

FROM node:22-alpine3.20
WORKDIR /app

COPY ./src ./src
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/.npmrc ./

RUN npm ci --omit=dev 
RUN npm i -g pm2

EXPOSE 2001

CMD [ "npm", "start" ]
