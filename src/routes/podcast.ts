import { Router } from "express";
import { podcastUpload } from "../utils/multer/multer";

import {
  createPodcast,
  getAllPodcast,
  getPodcastById,
  podcast_premium_create,
  getAllCategory,
  deletePodcast,
  updatePodcast,
} from "../handlers/podcastHandler";
import { auth } from "../middleware/auth/auth";
import { restrictToAdmin } from "../middleware/admin/admin";

export const PodcastRoute = Router();

/**
 * @swagger
 * /api/podcast:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello podcast
 */

PodcastRoute.post(
  "/create",

  // auth, restrictToAdmin("admin"),
  podcastUpload.fields([
    {
      name: "podcastFile",
    },
    { name: "imageFile" },
  ]),
  auth,
  restrictToAdmin,
  createPodcast
);

PodcastRoute.post(
  "/podcast_premuim_create",
  podcastUpload.single("podcast"),
  podcast_premium_create
);

PodcastRoute.get("/podcasts", getAllPodcast);
PodcastRoute.get("/podcast/:id", getPodcastById);
PodcastRoute.get("/podcast/:category", getAllCategory);

PodcastRoute.patch("/update/:id", updatePodcast);
PodcastRoute.delete("/update/:id", deletePodcast);
