import express from "express";
import { upload} from "../utils/multer/multer";

import { AdminMusic } from "../handlers/musicHandler/musicHandler";
import { auth,  restrictToAdmin } from "../middleware/auth/auth";
import { createMusicJoi } from "../utils/joi-validator";




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

 musicRouter.post("/create",createMusicJoi, auth, restrictToAdmin("admin"), upload.single("imageUrl"), AdminMusic)

musicRouter
  .get("/", (req, res) => {
    res.send("hello music");
  })

  .put("/update/:id", () => {})
  .delete("/delete/:id", () => { });
  
  export default musicRouter;
