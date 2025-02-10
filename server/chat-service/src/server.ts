import { application, Application } from "express";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";

import { config } from "@chat/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { connectToMongodb } from "@chat/db";
import { retryElasticSearchConnection } from "@chat/elasticsearch";
import { connectToRabbitmq } from "@chat/queue/connection";
import Redis from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import { chatSocketListner } from "@chat/sockets/chat";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Chat service",
  "info"
);

export let chatSocket: SocketServer;

const httpServer = function (app: Application): Server {
  const server = new Server(app);
  return server;
};

const startServer = function (app: Application) {
  const server = httpServer(app);
  socketConnection(server);
  server.listen(config.PORT, () => {
    logger.info(`Chat service start on port:${config.PORT}`);
  });
};

const startDb = async function () {
  await connectToMongodb();
};

const elasticsearch = async function () {
  await retryElasticSearchConnection();
};

const rabbitmqConnection = async function () {
  await connectToRabbitmq();
};

const socketConnection = function (server: Server) {
  const io: SocketServer = new SocketServer(server, {
    cors: {
      methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
      origin: config.API_GATEWAY_ENDPOINT!,
    },
  });

  const pubClient = new Redis(config.REDIS_ENDPOINT!);
  const subClient = pubClient.duplicate();

  io.adapter(createAdapter(pubClient, subClient));

  chatSocket = io;

  chatSocketListner(io);
};

const processHandlers = function () {
  process.on("uncaughtException", (err) => {
    console.log(`Uncaught error:${err}`);
    logger.error(`Uncaught error:${err}`);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    console.log(`Uncaught expression ${err}`);
    logger.error(`Uncaught expression:${err}`);
    process.exit(2);
  });

  process.on("SIGTERM", (sig) => {
    console.log(`Caught sigterm:${sig}`);
    logger.error(`Caught sigterm:${sig}`);
    process.exit(2);
  });

  process.on("SIGINT", (sig) => {
    console.log(`Caught sigint:${sig}`);
    logger.error(`Caught sigint:${sig}`);

    process.exit(2);
  });
};

export const start = async function (app: Application) {
  processHandlers();
  startServer(app);

  await startDb();
  await elasticsearch();
  await rabbitmqConnection();
};
