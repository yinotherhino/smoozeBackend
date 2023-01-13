import { NextFunction, Request, Response } from "express";
import { PodcastInstance } from "../../model/podcastModel";
import { v4 as uuid } from "uuid";
import { podcastAttributes } from "../../interface/podcastAttributes";

//====================Create Podcast===========================
export const createPodcast = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getFileData = async () => {
      const { podcastFile, imageFile } = req.files as any;
      const dataPath = {
        imagePath: imageFile[0].path,
        podcastName: podcastFile[0].originalname,
        podcastPath: podcastFile[0].path,
        podcastDuration: podcastFile[0].time,
      };
      return dataPath;
    };

    const { imagePath, podcastPath, podcastName } = await getFileData();
    const { category, song_duration, name } = req.body as podcastAttributes;
    const id = uuid();
    const podcast = (await PodcastInstance.create({
      id: id,
      imageUrl: imagePath,
      episodeUrl: podcastPath,
      title: podcastName,
      name,
      category,
      song_duration,
    })) as unknown as podcastAttributes;

    res.status(201).json({
      message: "Podcast created successfully",
      podcast,
      code: 201,
    });
  } catch (error: any) {
    next({ code: 400, message: "unable to create please try Again" });
  }
};

//========================== Get all Podcast================
export const getAllPodcast = async (req: Request, res: Response) => {
  try {
    const podcasts = await PodcastInstance.findAll({});
    if (podcasts) {
      res.status(200).json({
        message: "All podcast gotten successfully",
        podcasts,
      });
    } else {
      res.status(400).json({
        message: "No Podcast found",
      });
    }
  } catch (error) {
    res.status(500).json({
      Error: "Internal server error",
      route: "/api/podcast/podcasts",
    });
  }
};
//====================Get By ID==========================

export const getPodcastById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const podcast = await PodcastInstance.findByPk(id);
    return res.status(200).json({
      podcast,
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal server error",
      route: "/api/podcast/podcast",
    });
  }
};
//==================================Get Categories ===========================
export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    const Podcast = await PodcastInstance.findAll({
      where: { category: category },
    });
    return res.status(200).json({
      categories: Podcast,
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal server error",
      route: "/api/podcast/podcast",
    });
  }
};

//========================Update Podcast========================
export const updatePodcast = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, name, category, song_duration } = req.body;
    const getFileData = async () => {
      const { podcastFile, imageFile } = req.files as any;
      const dataPath = {
        imagePath: imageFile[0].path,
        podcastName: podcastFile[0].originalname,
        podcastPath: podcastFile[0].path,
        podcastDuration: podcastFile[0].time,
      };
      return dataPath;
    };
    const { imagePath, podcastPath, podcastName } = await getFileData();

    // const podcast = await PodcastInstance.findOne({
    //   where:{id:id}
    // }) as unknown as podcastAttributes;

    // if(!podcast){
    //   return res.status(400).json({
    //     Error: "You are not authorised to update this Podcast"
    //   })
    // }

    const updatedPodcast = (await PodcastInstance.update(
      {
        imageUrl: imagePath,
        episodeUrl: podcastPath,
        title: title,
        name: name || podcastName,
        category,
        song_duration,
      },
      { where: { id: id } }
    )) as unknown as podcastAttributes;

    if (updatedPodcast) {
      const Podcast = await PodcastInstance.findByPk(id);
      return res.status(200).json({
        message: "You have successfully updated the Podcast.",
        Podcast,
      });
    } else {
      return res.status(200).json({
        message: "Error occurred",
      });
    }
  } catch (error) {
    res.status(500).json({
      Error: "Internal server error",
      route: "/api/podcast/podcasts",
    });
  }
};

//=====================  Delete Podcast =============================

export const deletePodcast = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const podcastid = req.params.id;
    console.log(req.params.podcastid);
    // check if podcast exist

    // const Podcast = (await PodcastInstance.find({
    //   where: { id: podcastid},
    // })) as unknown as podcastAttributes;
    //
    const deletePodcast = await PodcastInstance.destroy({
      where: { id: podcastid },
    });

    if (!deletePodcast) throw { code: 400, message: "Id not found" };
    return res.status(200).json({
      message: "You have successfully deleted a podcast",
      deletePodcast,
    });
  } catch (error) {
    next(error)
  }
};
