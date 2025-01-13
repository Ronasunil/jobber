import { Application } from "express";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";

import { config } from "@gateway/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import Redis from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import { connectToRedis } from "./cache/connection";
import { gatewaySocketListner } from "@gateway/sockets/gatewaySocket";

export let gatewayCache: Redis;

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "gateway-service",
  "info"
);

export const start = async function (app: Application) {
  await startServer(app);
  db();
};

const httpServer = function (app: Application): Server {
  const server = new Server(app);
  return server;
};

const listenSocketConnections = function (io: SocketServer) {
  gatewaySocketListner(io);
};

const startSocketConnection = async function (server: Server) {
  const io = new SocketServer(server, {
    cors: {
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      origin: config.CLIENT_URL,
    },
  });

  const pubClient = new Redis(config.REDIS_HOST!);
  const subClient = pubClient.duplicate();

  io.adapter(createAdapter(pubClient, subClient));

  listenSocketConnections(io);
};

const startServer = async function (app: Application) {
  const server = httpServer(app);
  await startSocketConnection(server);

  server.listen(config.PORT, () => {
    logger.info(`gateway service is running on port:${config.PORT}`);
  });
};

const db = function () {
  const client = connectToRedis();
  gatewayCache = client;
};

process.on("SIGINT", (err) => {
  console.log(err);
});

process.on("SIGTERM", (err) => {
  console.log(err);
});
