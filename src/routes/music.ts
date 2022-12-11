import express from "express";
export const musicRouter = express.Router();
/**
 * @swagger
 * music
 */
musicRouter
  .get("/", (req, res) => {
    res.send("hello music");
  })
  .post("/create", () => {})
  .put("/update/:id", () => {})
  .delete("/delete/:id", () => {});
