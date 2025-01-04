import { Application } from "express";
import { Server } from "http";

import { config } from "@gateway/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "gateway-service",
  "info"
);

export const start = function (app: Application) {
  startServer(app);
};

const httpServer = function (app: Application): Server {
  const server = new Server(app);
  return server;
};

const startServer = function (app: Application) {
  const server = httpServer(app);
  server.listen(config.PORT, () => {
    logger.info(`gateway service is running on port:${config.PORT}`);
  });
};
