import { Application } from "express";
import { Server } from "http";
import { config } from "@review/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { connectToRabbitmq } from "@review/queues/connection";
import { connectToMysql } from "@review/db";
import { retryElasticsearchConnection } from "@review/elasticsearch";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Review service",
  "info"
);

const httpServer = function (app: Application): Server {
  const server = new Server(app);
  return server;
};

const startHttpServer = function (app: Application) {
  const server = httpServer(app);
  server.listen(config.PORT, () => {
    logger.info(`Review server started on port:${config.PORT}`);
  });
};

const rabbitmqConnection = async function () {
  await connectToRabbitmq();
};

const db = async function () {
  await connectToMysql();
};

const elasticsearch = async function () {
  await retryElasticsearchConnection();
};

const processHandlers = function () {
  process.on("uncaughtException", (err) => {
    console.log(`Uncaught error:${err}`);
    logger.error(`Uncaught error:${err}`);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    console.log(`Uncaught expression ${err}`);
    logger.error(`Uncaught expression:${err}`);
    process.exit(2);
  });

  process.on("SIGTERM", (sig) => {
    console.log(`Caught sigterm:${sig}`);
    logger.error(`Caught sigterm:${sig}`);
    process.exit(2);
  });

  process.on("SIGINT", (sig) => {
    console.log(`Caught sigint:${sig}`);
    logger.error(`Caught sigint:${sig}`);

    process.exit(2);
  });
};

export const start = async function (app: Application) {
  processHandlers();
  startHttpServer(app);

  await rabbitmqConnection();
  await db();
  await elasticsearch();
};
