import express from "express";
import {addGenre, getAllGenres, getGenreById, editGenre, deleteGenre} from '../handlers/genreHandler'
import { genreUpload } from "../utils/multer/multer";


export const genreRouter = express.Router();
/**
 * @swagger
 * /api/genre:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello genre
 */


genreRouter.post("/addgenre", genreUpload.single('genreImage'), addGenre )
genreRouter.get("/genres", getAllGenres)
genreRouter.get("/genre/:id", getGenreById)
genreRouter.patch("/edit/:id", genreUpload.single('genreImage'), editGenre)
genreRouter.delete("/delete/:id", deleteGenre)
