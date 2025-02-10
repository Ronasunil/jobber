import { Application } from "express";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import { io } from "socket.io-client";

import { config } from "@gateway/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import Redis from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import { connectToRedis } from "./cache/connection";
import { gatewaySocketListner } from "@gateway/sockets/gateway";
import { chatSocketListner } from "./sockets/chatClient";
import { appNotificationSocketListner } from "./sockets/appNotificationClient";

export let gatewayCache: Redis;
export let gatewaySocket: SocketServer;

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
  gatewaySocket = io;
  listenSocketConnections(io);
};

const setupChatSocketClient = function () {
  const socket = io(config.CHAT_WS_URL!, {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 2000,
  });

  chatSocketListner(socket);
};

const setupAppNotificationSocketClient = function () {
  const socket = io(config.APP_NOTIFICATION_WS_URL!, {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 2000,
  });

  appNotificationSocketListner(socket);
};

const startServer = async function (app: Application) {
  const server = httpServer(app);
  await startSocketConnection(server);

  // socket client connections
  setupChatSocketClient();
  setupAppNotificationSocketClient();

  server.listen(config.PORT, () => {
    logger.info(`gateway service is running on port:${config.PORT}`);
  });
};

const db = function () {
  const client = connectToRedis();
  gatewayCache = client;
};
