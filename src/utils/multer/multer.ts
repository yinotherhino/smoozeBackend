import multer from "multer";

const cloudinary = require("cloudinary").v2;

import { CloudinaryStorage } from "multer-storage-cloudinary";
// import config from "../../config";




cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



const updateprofile = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "UPDATESTORAGE",
      resource_type: "auto",
    };
  },
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
      resource_type: "auto",
      folder: "PREMUIUMAPPMUSIC",
    };
  },
});

const genrestorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "GENREIMAGE",
      resource_type: "auto",
    };
  },
});

const podcaststorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async () => {
    return {
      resource_type: "auto",
      folder: "SMOOVEPODCAST",
    };
  },
});

export const updateProfile = multer({ storage: updateprofile });
export const podcastUpload = multer({ storage: podcaststorage });
export const genreUpload = multer({ storage: genrestorage });
export const musicUpload = multer({ storage: musicstorage });
export const upload = multer({ storage: storage });





