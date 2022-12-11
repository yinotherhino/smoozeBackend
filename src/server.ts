import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

//:::contollers:::
import { protect } from "./middleware/auth/auth";
import { musicRouter, playlistRoute } from "./routes/index";
import { errorHandler, errorRouterHandler } from "./handlers/errorHandler";
import { signin, signup } from "./handlers/userHandler";

// ::::globals::::
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// ::::globals::::

app.use("/api/music", protect, musicRouter);
app.use("/api/playlist", protect, playlistRoute);
app.post("/signup", signup);
app.post("/signin", signin);
app.use(errorRouterHandler);
app.use(errorHandler);

export default app;
