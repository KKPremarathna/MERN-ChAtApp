import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import express from "express"

import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import userRouter from "./routes/userRoute.js";
import connectDB from "./config/db.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());
// If serving both from same origin, CORS can be removed. Otherwise:
app.use(cors({ origin: "http://localhost:5000", credentials: true }));

// API routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/user", userRouter);

// optional health endpoint instead of "/"
app.get("/api/health", (req, res) => res.send("ok"));

// serve frontend build
const distPath = path.join(__dirname, "../frontend/dist"); // adjust if needed
app.use(express.static(distPath));

// SPA fallback (Express 5)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server (API + Frontend) on http://localhost:${PORT}`);
  });
});
