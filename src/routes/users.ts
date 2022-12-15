import express from "express";
import { Register, signin, update } from "../handlers/userHandler";
import {
  requestPassword,
  verifyUser,
  changepassword,
} from "../handlers/userHandler/userHandler";
import { auth } from "../middleware/auth/auth";
import {
  loginUser,
  RegisterUser,
  updateUser,
  changePasswordJoi,
} from "../utils/joi-validator";
import { sendemailToken } from "../utils/joi-validator/schema";

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
usersRoute.post("/signin", loginUser, signin);
usersRoute.patch("/update", updateUser, auth, update);
usersRoute.post("/resetpassword", sendemailToken, requestPassword);
usersRoute.patch("/verify/:token", verifyUser);
usersRoute.post("/changepassword", changePasswordJoi, changepassword);
