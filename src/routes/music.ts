import express from "express";
import { premium_create } from "../handlers/musicHandler/musicHandler";
import { auth } from "../middleware/auth/auth";
import { upload } from "../utils/multer/multer";

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
  .get("/", (req, res) => {
    res.send("hello music");
  })
  .post("/create", () => {})
  .post("/prem_create", upload.single("imageUrl"), auth, premium_create)
  .put("/update/:id", () => {})
  .delete("/delete/:id", () => {});
