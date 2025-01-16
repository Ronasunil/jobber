import { config } from "@chat/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Server as SocketServer, Socket } from "socket.io";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Chat service",
  "info"
);

export const chatSocketListner = function (io: SocketServer) {
  io.on("connection", (socket: Socket) => {
    logger.info("chat socket connected successfully chat service");
  });
};
