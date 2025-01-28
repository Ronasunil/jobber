import { Application } from "express";
import http from "http";
import { config } from "@gig/Config";
import { BadRequest, winstonLogger } from "@ronasunil/jobber-shared";
import { connectToMongodb, connectToRedis } from "./db";
import { retryElasticSearchConnection } from "./elasticsearch";
import { connectToRabbitmq } from "@gig/queues/connection";
import { Channel } from "amqplib";
import Redis from "ioredis";
import { gigReviewConsumer } from "./queues/gigConsumer";

export let gigChannel: Channel;
export let gigCache: Redis;

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gig service",
  "info"
);

export const start = async function (app: Application) {
  startHttpServer(app);
  await startDb();
  await connectToElasticsearch();
  await rabbitmqConnection();
};

const httpServer = function (app: Application): http.Server {
  const server = new http.Server(app);
  return server;
};

const startHttpServer = function (app: Application) {
  const server = httpServer(app);
  server.listen(config.PORT, () => {
    logger.info(`Gig service start on port:${config.PORT}`);
  });
};

const startDb = async function () {
  await connectToMongodb();
  const client = connectToRedis();
  gigCache = client;
};

const connectToElasticsearch = async function () {
  await retryElasticSearchConnection();
};

const rabbitmqConnection = async function () {
  const channel = await connectToRabbitmq();
  if (!channel)
    throw new BadRequest(
      `Can't connect to rabbitmq rabbitmqConnection():`,
      "rabbitmqConnection() gig service"
    );

  gigChannel = channel;

  gigReviewConsumer(gigChannel);
  return channel;
};
