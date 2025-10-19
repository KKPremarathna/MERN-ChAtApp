// socket/index.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const userSocketMap = new Map(); // userId(string) -> socketId(string)
export const getReceiverSocketId = (recieverId) => userSocketMap.get(String(recieverId));

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query?.userId;
  if (userId && userId !== "undefined") {
    userSocketMap.set(String(userId), socket.id);
  }

  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  socket.on("disconnect", () => {
    for (const [uid, sid] of userSocketMap.entries()) {
      if (sid === socket.id) userSocketMap.delete(uid);
    }
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

export { app, server };
