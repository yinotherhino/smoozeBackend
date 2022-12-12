import express from 'express';
import { RegisterUser } from '../controllers/user';

var router = express.Router();

router.post('/', RegisterUser )

export default router;