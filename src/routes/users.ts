import express from "express";
import { signin, signup, update} from "../handlers/userHandler";
import { auth } from "../middleware/auth/auth";
import { updateUser } from "../utils/joi-validator";

export const usersRoute = express.Router();

usersRoute.post("/signup", signup);
usersRoute.post("/signin", signin);
usersRoute.post("/update",auth, updateUser, update);


