import { config } from "@gateway/Config";
import { gatewaySocket } from "@gateway/server";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Socket } from "socket.io-client";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gateway service",
  "info"
);

export const chatSocketListner = function (io: Socket) {
  io.on("connect", () => {
    logger.info(
      "Chat socket client connected to chat server sucessfully gateway service"
    );
  });

  io.on("disconnect", (reason: Socket.DisconnectReason) => {
    logger.error(`Disconnected reason:${reason}`);
    io.connect();
  });

  io.on("connect_error", (err: Error) => {
    logger.info("Error connecting to chat socket server...");
    logger.error(err);
    io.connect();
  });

  // Custom events
  chatSocketCustomEvents(io);
};

const chatSocketCustomEvents = function (io: Socket) {
  io.on("message-received", (chat) => {
    gatewaySocket.emit("message-received", chat);
  });

  io.on("message-updated", (chat) => {
    gatewaySocket.emit("message-updated", chat);
  });

  io.on("message-deleted", (id: string) => {
    gatewaySocket.emit("message-deleted", id);
  });
};
