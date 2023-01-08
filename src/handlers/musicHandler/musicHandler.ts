import { Request, Response, NextFunction } from "express";
import { MusicsAttributes, UserAttributes } from "../../interface";
import { UserInstance } from "../../model";
import { AllMusicInstance } from "../../model/musicModel";
import { v4 as UUID } from "uuid";



export const AdminMusic = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const uuiduser = UUID();
        const {
            title,
            artistId,
            albumId,
            genreId,
            year
            } = req.body as MusicsAttributes;

        const user = await UserInstance.findOne({
            where: { email: req.body.email }
        }) as unknown as UserAttributes;
        
        if (!user) {
            return res.status(404).json({
                message: "You are not a registered user "
            })
        }
        if (user.role === "admin") { 
            const music = (await AllMusicInstance.create({
                id: uuiduser,
                title,
                artistId,
                albumId,
                genreId,
                year,
                imageUrl:req.file ? req.file.path: "",
                songUrl: req.file ? req.file.path: "",
                createdAt: new Date(),
            })) as unknown as MusicsAttributes;

       return res.status(201).json({
            message: "All Songs",
            music
        })
            
        } else {
            return res.status(404).json({
                message: "You are not an admin"
            })
        }
        
       
    } catch (error) {
        next(error);
    }
}
    