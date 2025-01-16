import {
  addOnlineUsersCache,
  getOnlineUsersCache,
  removeOnlineUsersCache,
} from "@gateway/cache/gatewayCache";
import { config } from "@gateway/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

import { Server as SocketServer, Socket } from "socket.io";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gateway service",
  "info"
);

export const gatewaySocketListner = function (io: SocketServer) {
  io.on("connection", (socket: Socket) => {
    gatewaySocketEvents(socket);
  });
};

const gatewaySocketEvents = function (socket: Socket) {
  socket.on("getOnlineUsers", async () => {
    const users = await getOnlineUsersCache();
    socket.emit("online-users", users);
  });

  socket.on("addOnlineUsers", async (username: string) => {
    await addOnlineUsersCache(username);
  });

  socket.on("removeOnlineUsers", async (username: string) => {
    const result = await removeOnlineUsersCache(username);
    socket.emit("online-users", result);
  });
};
