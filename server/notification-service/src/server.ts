import { BadRequest, winstonLogger } from "@ronasunil/jobber-shared";
import { Server } from "http";

import { retryElasticSearchConnection } from "@notifications/elasticsearch";
import { config } from "@notifications/config";
import { rabbitmqConnection } from "@notifications/queues/connection";
import { Application } from "express";
import { emailAuthConsumer } from "./queues/emailConsumer";

console.log(config.APM_START, config.ELASTIC_SEARCH_ENDPOINT);

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "notificationService",
  "info"
);

export const start = function (app: Application) {
  httpServer(app);
  startElasticSearch();
  startRabbitMq();
};

const httpServer = function (app: Application): void {
  const server = new Server(app);
  server.listen(config.PORT, 5001, () => {
    logger.info("Notification service server started");
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

  const message = JSON.stringify({
    receiverEmail: config.SENDER_EMAIL,
    resetLink: "",
    template: "verifyEmail",
    username: "rona",
    verifyLink: "",
  });
  await channel.assertExchange("email-auth-notifications", "direct");
  channel.publish(
    "email-auth-notifications",
    "email-auth",
    Buffer.from(message)
  );
};
