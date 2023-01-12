import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { v4 as UUID } from "uuid";
import { musicAttributes } from "../../interface/musicAttributes";
import { RecentMusicAttributes } from "../../interface/RecentMusicAttribute";
// import { musicAttributes, RecentMusicAttributes } from "../../interface";
import { PlayedMusicInstance,  } from "../../model";
import { MusicInstance } from "../../model/musicModel";

/* ==========================   CREATE PLAYED MUSIC  =============================. */

export const CreatePlayedMusic = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const uuidplayedmusic = UUID();
    let id = req.params.id
    
    const fetchMusic = await MusicInstance.findByPk(id) as unknown as musicAttributes
console.log(fetchMusic)

    const musicProp =  await PlayedMusicInstance.create({
     id: uuidplayedmusic,
    title: fetchMusic.title,
    genreId: fetchMusic.genreId,
    imageUrl: fetchMusic.imageUrl,
    songUrl: fetchMusic.songUrl,
    createdAt: new Date(),
    }) as unknown as RecentMusicAttributes

    return res.status(201).json({
        message: "Music added to recently played music",
        recentlyPlayed:newlyPlayed
    })
  } catch (err) {
    next(err);
  }
};

/* ==========================   DISPLAY PLAYED MUSIC  =============================. */

export const DisplayPlayedMusic = async (
    req: JwtPayload,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const recentlyPlayedSongs = await PlayedMusicInstance.findAll({ where:{userId:req.user.id},
            order: [['updatedAt', 'DESC']],
            limit: 6,
            include: MusicInstance
          });
          return res.status(200).json({
            recentlyPlayedSongs
          })
    } catch (err) {
      next(err);
    }
  };