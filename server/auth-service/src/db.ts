import { Sequelize } from "sequelize";

import { config } from "@auth/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Auth service",
  "info"
);

const getSequelize = function (): Sequelize {
  console.log(config.MYSQL_DB);
  const sequlize = new Sequelize(config.MYSQL_DB!, {
    logging: false,
    dialectOptions: {
      multipleStatements: true,
    },
  });

  return sequlize;
};

export const sequelize = getSequelize();

export const connectToMysql = async function () {
  try {
    await sequelize.authenticate();
    logger.info("Connected to mysql db");
  } catch (err) {
    if (err instanceof Error) logger.error(err.message, err);
    else logger.error("Unknown error", err);
  }
};
