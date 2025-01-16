import mongoose from "mongoose";
import { config } from "@chat/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Chat service",
  "info"
);

export const connectToMongodb = async function () {
  try {
    await mongoose.connect(config.MONGO_DB_ENDPOINT!);
    logger.info("Successfully connected to mongodb chat service");
  } catch (err) {
    logger.info("Failed connecting to mongodb");
    logger.error(err);
    connectToMongodb();
  }
};
