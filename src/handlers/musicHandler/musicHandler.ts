import { Request, Response, NextFunction } from "express";
import { MusicsAttributes, UserAttributes } from "../../interface";
import { UserInstance } from "../../model";
import { AllMusicInstance } from "../../model/musicModel";
import { v4 as UUID } from "uuid";
import * as cloudinary from 'cloudinary';
import { JwtPayload } from "jsonwebtoken";


export const AdminMusic = async (req: JwtPayload, res: Response, next: NextFunction) => { 
    try {

    const songFile = req.files?.audioFile[0];
    const imageFile = req.files?.imageFile[0];

    const songResult = await cloudinary.uploader.upload(songFile.tempFilePath, { resource_type: 'auto' });
    const imageResult = await cloudinary.uploader.upload(imageFile.tempFilePath, { resource_type: 'auto' })

    res.send({ message: 'Music created successfully' });
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
                imageUrl:imageResult.secure_url,
                songUrl:songResult.secure_url,
                createdAt: new Date(),
            })) as unknown as MusicsAttributes;

    //    return res.status(201).json({
    //         message: "All Songs",
    //         music
    //     })
            
        // } else {
        //     return res.status(404).json({
        //         message: "You are not an admin"
        //     })
        // }
        
       
    } catch (error) {
        next(error);
    }
}
    