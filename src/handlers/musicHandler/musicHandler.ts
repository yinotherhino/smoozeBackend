import { Response, NextFunction, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { v4 as UUID } from "uuid";
import { musicAttributes } from "../../interface/musicAttributes";
import { MusicInstance } from "../../model/musicModel";
export const premium_create = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const getMusicData = async () => {
      const { song_file, image_file } = req.files;
      console.log(req.files);
      const data_path = {
        image_path: image_file[0].path,
        song_name: song_file[0].originalName,
        song_path: song_file[0].path,
      };
      return data_path;
    };

    const { image_path, song_path, song_name } = await getMusicData();
    console.log(image_path, song_path, song_name);

    const music_id = UUID();
    const { title, artistId, genreId, year, song_duration, artist } =
      req.body as musicAttributes;
    const createMusic = (await MusicInstance.create({
      id: music_id,
      title,
      artistId,
      genreId,
      year,
      artist,
      imageUrl: image_path,
      songUrl: song_path,
      song_duration,
    })) as unknown as musicAttributes;

    res.status(201).json({
      message: "Music created successfully",
      createMusic,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    });
  }
};

export const getAllMusic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await MusicInstance.findAll();

    res.status(200).json({
      songs,
      code: 200,
      message: "you have succesfully received all songs",
    });
  } catch (error) {
    next(error);
  }
};
