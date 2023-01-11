import { NextFunction, Request, Response } from "express";
import { MusicInstance } from "../../model/musicModel";
// import { v4 as UUID } from "uuid";
// import { MusicInstance } from "../../model/musicModel";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

export const premium_create = async (req: Request, res: Response) => {
    // const newSong = song({imageUrl:req.body.imageUrl,
    //                       songUrl: req.body.songUrl, 
    //                       artist: req.body.artist, 
    //                       genre: req.body.genre
    //                     })
    // const {imageUrl, songUrl} = req.body
    // {artist, genre}
    try {
        const song = req.file ? req.file.path : undefined
        console.log(song)
        // const savedSong = await MusicInstance.create({imageUrl, songUrl, artist, genre})
        // res.status(200).send({song:savedSong})

    } catch (error) {
        res.status(400).send({ success: false, msg: "error" })
    }
}


export const getAllMusic = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const songs = await MusicInstance.findAll();

        res
            .status(201)
            .json({ songs, code: 201, message: "you have succesfully received all songs" });

    } catch (error) {
        next(error);
    }
}

