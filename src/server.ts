import express from "express";
import morgan from "morgan";
import cors from "cors";
import { HttpError } from "http-errors";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

//:::contollers:::
import { protect } from "./middleware/auth/auth";
import { musicRouter, playlistRoute, usersRoute } from "./routes/index";
import { errorHandler, errorRouterHandler } from "./handlers/errorHandler";
import { db } from "./config/db";
import { swaggerDocs } from "./utils/swagger";

// ::::initalise database:::
db.sync({ force: true })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error: HttpError) => {
    console.log(error);
  });
// ::::globals::::
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// :::: end globals::::

swaggerDocs(app);
app.use("/api/music", protect, musicRouter);
app.use("/api/playlist", protect, playlistRoute);
app.use("/api/user", usersRoute);
app.use(errorRouterHandler);
app.use(errorHandler);

export default app;
