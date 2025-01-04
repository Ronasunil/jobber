import { Application } from "express";
import { Server } from "http";
import { config } from "@user/Config";
import { BadRequest, winstonLogger } from "@ronasunil/jobber-shared";
import { connectToMongodb } from "./db";
import { connectToRabbitmq } from "@user/queues/connection";
import { retryElasticSearchConnection } from "./elasticsearch";
import {
  sellerJobConsumer,
  userBuyerCreateConsumer,
} from "./queues/userConsumer";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "User-service",
  "info"
);

export const start = async function (app: Application) {
  startServer(app);

  await dbConnection();
  await rabbitmqConnection();
  await elasticsearchConnection();
};

const httpServer = function (app: Application) {
  const server = new Server(app);
  return server;
};

const startServer = function (app: Application) {
  const server = httpServer(app);
  server.listen(config.PORT, () => logger.info("User service started"));
};

const dbConnection = async function () {
  await connectToMongodb();
};

const rabbitmqConnection = async function () {
  const channel = await connectToRabbitmq();
  if (!channel)
    throw new BadRequest(
      "Channel is not defined try reconnecting to rabbitmq",
      "rabbitmqConnection(): user service"
    );

  await userBuyerCreateConsumer(channel);
  await sellerJobConsumer(channel);
  return channel;
};

const elasticsearchConnection = async function () {
  await retryElasticSearchConnection();
};
