import express from "express";
import { AdminMusic, premium_create } from "../handlers/musicHandler/musicHandler";
import { restrictToAdmin } from "../middleware/admin/admin";
import { auth } from "../middleware/auth/auth";
import { is_premium } from "../middleware/is_premium/is_premium";
import { musicUpload,upload } from "../utils/multer/multer";

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

 musicRouter.post("/create-songs",auth, restrictToAdmin,  upload.fields([{ name: 'songFile' }, { name: 'imageFile' }]), AdminMusic)
musicRouter
  .post("/create", () => {})
  .post(
    "/prem_create",
    auth,
    musicUpload.fields([{ name: "song_file" }, { name: "image_file" }]),
    is_premium,
    premium_create
  )
  .put("/update/:id", () => {})
  .delete("/delete/:id", () => { });
  
  export default musicRouter;


