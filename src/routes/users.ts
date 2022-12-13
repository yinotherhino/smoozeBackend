import express from "express";
import { signin, signup } from "../handlers/userHandler";

export const usersRoute = express.Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns user details
 */
usersRoute.post("/signup", signup);
usersRoute.post("/signin", signin);
