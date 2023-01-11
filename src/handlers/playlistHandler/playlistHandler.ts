import { musicAttributes } from "./../../interface/musicAttributes";
import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
import { PlaylistInstance } from "../../model";
import { MusicInstance } from "../../model";
import { UserAttributes } from "../../interface";

export const getPlaylistSongs = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user.id;
    const user = (await UserInstance.findOne({
      where: { id },
    })) as unknown as UserAttributes;

    if (user.is_premium) {
      const playlist = await PlaylistInstance.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({ code: 200, playlist });
    } else {
      //User status isn't premium
      throw { code: 400, message: "User is not a premium user" };
    }
  } catch (err) {
    next(err);
  }
};

export const addSongToPlaylist = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user.id;
    const songId = req.params.songId;

    const user = (await UserInstance.findOne({
      where: { id },
    })) as unknown as UserAttributes;

    const song = (await MusicInstance.findOne({
      where: { id: songId },
    })) as unknown as musicAttributes;

    if (user.is_premium) {
      let newPlaylistSong = await PlaylistInstance.create({
        id: song.id,
        title: song.title,
        artist: song.artist,
        album: song.album,
        song_duration: song.song_duration,
        genre_id: song.genre_id,
        songUrl: song.songUrl,
        imageUrl: song.imageUrl,
      });

      return res.status(201).json({
        message: "Song successfully added to playlist",
        newPlaylistSong,
      });
    } else {
      //User status isn't premium
      //User status isn't premium
      throw { code: 400, message: "User is not a premium user" };
    }
  } catch (err) {
    next(err);
  }
};
