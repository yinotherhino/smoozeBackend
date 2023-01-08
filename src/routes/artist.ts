import express from "express";
import { CreateArtist} from "../handlers/artistHandler";
import { createArtistJoi, } from "../utils/joi-validator/schema";
import { upload } from "../utils/multer/multer";
// import { auth } from "../middleware/auth/auth";



export const artistRoute = express.Router();

artistRoute.post("/",  createArtistJoi, upload.single("imageUrl"),CreateArtist);

 