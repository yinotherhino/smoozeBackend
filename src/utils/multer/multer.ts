import multer from "multer";

const cloudinary = require("cloudinary").v2;

import { CloudinaryStorage } from "multer-storage-cloudinary";
// import config from "../../config";
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
  cloud_name: 'ddtii3waj', 
  api_key: '976457571935162', 
  api_secret: 'dRzFjskey3MI07FaQgN7VtQUjkw' 
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "ADMIINMUSIC",
      resource_type: "auto",
    };
  },
});

const musicstorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      format: "mp3",
      folder: "SMOOVEAPPMUSIC",
    };
  },
});

const genrestorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async(req,file)=> {
      return {
          folder: "GENREIMAGE",
      }
  },
});

export const genreUpload = multer({storage:genrestorage})
export const musicUpload = multer({ storage: musicstorage });
export const upload = multer({ storage: storage });
