import express from "express";
import morgan from "morgan";
import cors from "cors";
import { HttpError } from "http-errors";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

//:::handlers:::
import {
  genreRouter,
  musicRouter,
  playlistRoute,
  usersRoute,
  artistRoute,
  playedMusicRoute,
} from "./routes/index";

import { errorHandler, errorRouterHandler } from "./handlers/errorHandler";
import { db } from "./config/db";
import { swaggerDocs } from "./utils/swagger";
import { googleoAuthentry } from "./utils/google-auth/googleAuth";
import { fboauthBackend } from "./utils/fb-auth/fbAuth";
import { PodcastRoute } from "./routes/podcast";
// ::::initalise database:::
db.sync()
  .then(() => {
    console.log("connected to db");
  })
  .catch((error: HttpError) => {
    console.log(error);
  });

  var corsOptions = {
    origin: 'https://smooze.netlify.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


// ::::globals::::
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use( (req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', 'https://smooze.netlify.app');
  next();
  });
app.use(express.urlencoded({ extended: true }));
// :::: end globals::::

swaggerDocs(app);
app.use("/api/music", musicRouter);
app.use("/api/playlist", playlistRoute);
app.use("/api/user", usersRoute);
app.use("/api/artists", artistRoute);
app.use("/api/recent", playedMusicRoute);
app.use("/api/genre", genreRouter);
app.use("/api/podcast", PodcastRoute);
googleoAuthentry(app);
fboauthBackend(app);
app.use(errorRouterHandler);
app.use(errorHandler);

export default app;
