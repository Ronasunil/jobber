import { config } from "@review/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Sequelize } from "sequelize-typescript";
import { Review } from "@review/model/reviewModel";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Review service",
  "info"
);

const getSequelize = function (): Sequelize {
  const sequlize = new Sequelize(config.MYSQL_DB_ENDPOINT!, {
    logging: false,
    models: [Review],
    dialectOptions: {
      multipleStatements: true,
    },
  });

  return sequlize;
};

export const sequlize = getSequelize();

export const connectToMysql = async function () {
  try {
    await sequlize.authenticate();
    await Review.sync({});
    logger.info("Successfully connected to mysql review service");
  } catch (error) {
    logger.info("Error connecting to mysql review service");
    logger.error(error);
  }
};
