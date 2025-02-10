import { config } from "@app-notification/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Socket, Server as SocketServer } from "socket.io";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gateway service",
  "info"
);

export const notificationSocketListner = function (io: SocketServer) {
  io.on("connection", (socket: Socket) => {
    logger.info("Notifiction socket started");

    socket.on("disconnect", (reason) => {
      logger.info(`Socket disconnected: ${reason}`);
    });
  });
};
