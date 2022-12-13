import express from "express";
import { signin, signup } from "../handlers/userHandler";

export const usersRoute = express.Router();

/**
 * @swagger
 * users:
 */
usersRoute.post("/signup", signup);
usersRoute.post("/signin", signin);
