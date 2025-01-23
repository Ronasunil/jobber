import { winstonLogger } from "@ronasunil/jobber-shared";
import { config } from "@app-notification/Config";
import mongoose from "mongoose";

const logger = winstonLogger(
  config.API_GATEWAY_ENDPOINT!,
  "App- notification service",
  "info"
);

export const connectToDb = async function () {
  try {
    await mongoose.connect(config.MONGO_DB_ENDPOINT!);
    logger.info("Successfully conencted to mongodb");
  } catch (err) {
    logger.info("Error connecting to mongodb..");
    logger.error(err);
    connectToDb();
  }
};
