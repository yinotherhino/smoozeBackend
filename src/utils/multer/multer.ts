import multer from "multer";

const cloudinary = require("cloudinary").v2;

import { CloudinaryStorage } from "multer-storage-cloudinary";
import config from "../../config";

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "SMOOVEAPP",
    };
  },
});
const musicstorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      resourceType: "auto",
      folder: "PREMIUMAPPMUSIC",
    };
  },
});
export const musicUpload = multer({ storage: musicstorage });
export const upload = multer({ storage: storage });
