import express from "express";
import { getAllMusic, premium_create } from "../handlers/musicHandler/musicHandler";
import { auth } from "../middleware/auth/auth";
import { musicUpload } from "../utils/multer/multer";

export const musicRouter = express.Router();
/**
 * @swagger
 * /api/music:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello music
 */
musicRouter
  .get("/get_song", auth, getAllMusic)
  .post("/create", () => {})
  .post("/prem_create", musicUpload.single("song"), auth, premium_create)
  .put("/update/:id", () => {})
  .delete("/delete/:id", () => {});
