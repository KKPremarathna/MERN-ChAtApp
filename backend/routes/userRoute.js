import express from "express";
import authentication from "../middlewares/authentication.js";
import { getUsersForSidebar } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", authentication, getUsersForSidebar);

export default userRouter;
