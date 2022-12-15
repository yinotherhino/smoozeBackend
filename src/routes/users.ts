import express from "express";
import { Register, signin, update, } from "../handlers/userHandler";
import { auth } from "../middleware/auth/auth";
import { loginUser, RegisterUser, updateUser } from "../utils/joi-validator";
import { forgotPassword } from "../handlers/userHandler/userHandler";
import { resetPassword } from "../handlers/userHandler/forgotpasswordhandler";

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
usersRoute.post("/signin",loginUser , signin);
usersRoute.patch("/update",updateUser, auth,  update);
usersRoute.post("/forgot-password", forgotPassword);
usersRoute.post("/reset-password", resetPassword);



