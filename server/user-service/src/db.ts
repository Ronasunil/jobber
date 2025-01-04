import mongoose from "mongoose";
import { config } from "@user/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Auth service",
  "info"
);

export const connectToMongodb = async function () {
  try {
    await mongoose.connect(config.MONGO_DB_ENDPOINT!);
    logger.info("Successfully connected to mongodb");
  } catch (err) {
    logger.info("Error connecting to mongodb Auth service");
    logger.error(err);
    connectToMongodb();
  }
};
