import { Application } from "express";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import Redis from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";

import { config } from "@app-notification/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { connectToDb } from "@app-notification/db";
import { retryElasticSearchConnection } from "@app-notification/elasticsearch";
import { connectToRabbitmq } from "@app-notification/queues/connection";
import { notificationSocketListner } from "@app-notification/sockets/notification";

export let appNotificationSocket: SocketServer;

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "App-notification service",
  "info"
);

const httpServer = function (app: Application): Server {
  const server = new Server(app);
  return server;
};

const startServer = function (app: Application) {
  const server = httpServer(app);
  server.listen(config.PORT!, () => {
    logger.info(`App-notification service start on port:${config.PORT}`);
  });

  socketConnection(server);
};

const socketConnection = function (server: Server) {
  const io: SocketServer = new SocketServer(server, {
    cors: {
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      origin: config.API_GATEWAY_ENDPOINT!,
    },
  });

  const pubClient = new Redis(config.REDIS_ENDPOINT!);
  const subClient = pubClient.duplicate();

  io.adapter(createAdapter(pubClient, subClient));

  appNotificationSocket = io;

  notificationSocketListner(io);
};

const db = async function () {
  await connectToDb();
};

const elasticsearch = async function () {
  await retryElasticSearchConnection();
};

const rabbitmq = async function () {
  await connectToRabbitmq();
};

export const start = async function (app: Application) {
  startServer(app);

  await db();
  await elasticsearch();
  await rabbitmq();
};
