import {
  addOnlineUsersCache,
  getOnlineUsersCache,
  removeOnlineUsersCache,
} from "@gateway/cache/gatewayCache";

import { Server, Socket } from "socket.io";

export const gatewaySocketListner = function (io: Server) {
  io.on("connection", (socket: Socket) => gatewaySocketEvents(socket));
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
