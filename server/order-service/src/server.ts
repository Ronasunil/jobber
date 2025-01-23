import { Application } from "express";
import { Server } from "http";

import { config } from "@order/Config";
import { BadRequest, winstonLogger } from "@ronasunil/jobber-shared";
import { connectToDb } from "@order/db";
import { retryElasticSearchConnection } from "@order/elasticsearch";
import { connectToRabbitmq } from "@order/queues/connection";
import { Channel } from "amqplib";

export let orderChannel: Channel;

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Order service",
  "info"
);

const httpServer = function (app: Application): Server {
  const server = new Server(app);
  return server;
};

const startServer = function (app: Application) {
  const server = httpServer(app);
  server.listen(config.PORT!, () => {
    logger.info(`Order service start on port:${config.PORT}`);
  });
};

const db = async function () {
  await connectToDb();
};

const elasticsearch = async function () {
  await retryElasticSearchConnection();
};

const rabbitmq = async function () {
  const channel = await connectToRabbitmq();
  if (!channel)
    throw new BadRequest(
      "Error connecting to rabbitmq",
      "rabbitmq(): order service"
    );

  orderChannel = channel;
};

export const start = async function (app: Application) {
  startServer(app);

  await db();
  await elasticsearch();
  await rabbitmq();
};
