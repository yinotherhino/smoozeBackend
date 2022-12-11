import { Router } from "express";

export const playlistRoute = Router();

/**
 * @swagger
 * playlist
 */
playlistRoute
  .get("/", (req, res) => {
    res.send("hello playlist");
  })
  .post("/create", () => {})
  .put("/update/:id", () => {})
  .delete("/delete/:id", () => {});
