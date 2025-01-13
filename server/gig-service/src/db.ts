import mongoose from "mongoose";
import Redis from "ioredis";
import { winstonLogger } from "@ronasunil/jobber-shared";

import { config } from "@gig/Config";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gig service",
  "info"
);

export const connectToMongodb = async function () {
  try {
    await mongoose.connect(config.MONGO_DB_ENDPOINT!);
    logger.info("Successfully connect to mongodb gig service");
  } catch (err) {
    connectToMongodb();
    logger.info("Error connecting to mongodb...");
    logger.error(err);
  }
};

export const connectToRedis = function (): Redis {
  const client = new Redis(config.REDIS_ENDPOINT!);
  logRedisConnection(client);

  return client;
};

const logRedisConnection = function (client: Redis) {
  client.on("error", (err) => {
    logger.info("Error connecting to redis...");
    logger.error(err);
  });

  client.on("connect", () => {
    logger.info("Succesfully connected to redis");
  });

  client.on("connecting", () => {
    logger.info("connecting to redis...");
  });
};
