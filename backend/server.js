import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import userRouter from "./routes/userRoute.js";

import connectDB from "./config/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.get("/", (req, res) => {
  res.send("working fine");
});
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/user", userRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
  });
});
