import { config } from "@gateway/Config";
import { gatewaySocket } from "@gateway/server";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Socket } from "socket.io-client";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gateway service",
  "info"
);

export const appNotificationSocketListner = function (io: Socket) {
  io.on("connect", () => {
    logger.info("App notification conencted to socket server");
  });

  io.on("connect_error", (err: Error) => {
    logger.info("Error conencting to App notification socket server..");
    logger.error(err);
    io.connect();
  });

  io.on("disconnect", (reason: Socket.DisconnectReason) => {
    logger.info("Disconnected from App notification socket server..");
    logger.error(reason);
    io.connect();
  });

  //   Custom events
  appNotificationCustomEvents(io);
};

const appNotificationCustomEvents = function (io: Socket) {
  io.on("notification", (notification, userTo) => {
    gatewaySocket.emit("notification", notification, userTo);
  });

  io.on("updated-notification", (notification, userTo) => {
    gatewaySocket.emit("updated-notification", notification, userTo);
  });
};
