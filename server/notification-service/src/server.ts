import { BadRequest, winstonLogger } from "@ronasunil/jobber-shared";
import { Server } from "http";

import { retryElasticSearchConnection } from "@notifications/elasticsearch";
import { config } from "@notifications/config";
import { rabbitmqConnection } from "@notifications/queues/connection";
import { Application } from "express";
import { emailAuthConsumer } from "./queues/emailConsumer";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "notificationService",
  "info"
);

export const start = async function (app: Application) {
  startServer(app);
  await startElasticSearch();
  await startRabbitMq();
};

const httpServer = function (app: Application): Server {
  const server = new Server(app);
  return server;
};

const startServer = function (app: Application) {
  const server = httpServer(app);
  server.listen(config.PORT, () => {
    logger.info("Notification service server started23");
  });
};

const startElasticSearch = async function (): Promise<void> {
  await retryElasticSearchConnection();
};

const startRabbitMq = async function name() {
  const channel = await rabbitmqConnection();
  if (!channel)
    throw new BadRequest(
      "Rabbitmq connection failed",
      "Notification service:rabbitmqConnection()"
    );
  emailAuthConsumer(channel);
};
