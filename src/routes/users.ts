import express from "express";
import { signin, signup } from "../handlers/userHandler";

export const usersRoute = express.Router();

usersRoute.post("/signup", signup);
usersRoute.post("/signin", signin);
