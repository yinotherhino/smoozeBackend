import express from 'express';
import { Register} from '../handlers/userHandler';
import { RegisterUser } from '../utils/joi-validator';

export const usersRoute = express.Router();

usersRoute.post('/signup',RegisterUser,Register);

