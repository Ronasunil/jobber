import { Application } from "express";
import { Server } from "http";
import { BadRequest, winstonLogger } from "@ronasunil/jobber-shared";

import { config } from "@auth/Config";
import { retryElasticSearchConnection } from "@auth/elasticsearch";
import { connectToMysql } from "./db";
import { connectToRabbitmq } from "@auth/queues/connection";
import { Channel } from "amqplib";
import { startGrpcServer } from "@auth/grpc/authServer";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Auth service",
  "info"
);

export let authChannel: Channel;

export const start = async function (app: Application) {
  startServer(app);
  await dbConnection();
  startGrpc();
  await elasticsearchConnection();
  await rabbitmqConnection();
};

const httpServer = function (app: Application): Server {
  const httpServer = new Server(app);
  return httpServer;
};

const elasticsearchConnection = async function () {
  await retryElasticSearchConnection();
};

const dbConnection = async function () {
  await connectToMysql();
};

const rabbitmqConnection = async function () {
  const channel = await connectToRabbitmq();
  if (!channel)
    throw new BadRequest(
      `Can't connect to rabbitmq rabbitmqConnection():`,
      "rabbitmqConnection() auth service"
    );

  authChannel = channel;
};

const startGrpc = function () {
  startGrpcServer();
};

const startServer = function (app: Application): void {
  const server = httpServer(app);

  server.listen(config.PORT, () => {
    logger.info(`Auth service server started on port:${config.PORT}`);
  });
};

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  process.exit(1);
});
