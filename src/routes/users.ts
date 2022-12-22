import express from "express";
import { Register, signin, update, getUser } from "../handlers/userHandler";
import {
  requestPassword,
  verifyUser,
  changepassword,
} from "../handlers/userHandler/userHandler";
import { auth } from "../middleware/auth/auth";
import {
  loginUserJoi,
  RegisterUserJoi,
  changePasswordJoi,
} from "../utils/joi-validator";
import { sendemailTokenJoi } from "../utils/joi-validator/schema";
import { upload } from '../utils/multer/multer'

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

usersRoute.post("/signup", RegisterUserJoi, Register);
usersRoute.post("/signin", loginUserJoi, signin);
usersRoute.patch("/update", upload.single('profileImage'), auth, update);
usersRoute.post("/resetpassword", sendemailTokenJoi, requestPassword);
usersRoute.patch("/verify", verifyUser);
usersRoute.post("/changepassword", changePasswordJoi, changepassword);
usersRoute.get("/get-user", auth, getUser);
