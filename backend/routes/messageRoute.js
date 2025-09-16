import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import authentication from "../middlewares/authentication.js";

const messageRouter = express.Router();

messageRouter.get("/:id", authentication, getMessage);
messageRouter.post("/send/:id", authentication, sendMessage);

export default messageRouter;
