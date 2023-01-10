import multer from 'multer';

const cloudinary = require('cloudinary').v2

import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({ 
  cloud_name: 'dlc74xxaj', 
  api_key: '142554934655842', 
  api_secret: 'ec8eAssRnMHln6yzwyWJqrYyYTc' 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async(req,file)=> {
    
      return {
          folder: "SMOOVEAPP",
      }
  },
});
const musicstorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async(req,file)=> {
      return {
           format:"mp3",
          folder: "SMOOVEAPPMUSIC",
      }
  },
});
export const musicUpload = multer({storage:musicstorage})
export const upload = multer({storage:storage})