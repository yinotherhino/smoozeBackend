import express from "express";
import morgan from "morgan";
import cors from "cors";
import { HttpError } from "http-errors";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

//:::handlers:::
import { protect } from "./middleware/auth/auth";
import {
  genreRouter,
  musicRouter,
  playlistRoute,
  usersRoute,
} from "./routes/index";
import { errorHandler, errorRouterHandler } from "./handlers/errorHandler";
import { db } from "./config/db";
import { swaggerDocs } from "./utils/swagger";
import { googleoAuthentry } from "./utils/google-auth/googleAuth";
import { fboauthBackend } from "./utils/fb-auth/fbAuth";
import { PodcastRoute } from "./routes/podcast";
// import { facebookRoute } from "./handlers/userHandler";

// ::::initalise database:::
db.sync()
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
app.use("/api/genre", genreRouter);
app.use("/api/podcast",PodcastRoute);
googleoAuthentry(app);
fboauthBackend(app);
app.use(errorRouterHandler);
app.use(errorHandler);

export default app;
