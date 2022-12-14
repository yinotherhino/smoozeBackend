import express from "express";
import { Register } from "../handlers/userHandler";
import { RegisterUser } from "../utils/joi-validator";

export const usersRoute = express.Router();
/**
 * @swagger
 * /api/user:
 *   post:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns User Object
 */

usersRoute.post("/signup", RegisterUser, Register);
