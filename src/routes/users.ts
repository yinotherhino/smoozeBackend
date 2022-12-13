<<<<<<< HEAD
import express from "express";
import { signin, signup, update} from "../handlers/userHandler";
import { auth } from "../middleware/auth/auth";
import { updateUser } from "../utils/joi-validator";

export const usersRoute = express.Router();

usersRoute.post("/signup", signup);
usersRoute.post("/signin", signin);
usersRoute.post("/update",auth, updateUser, update);


=======
import express from 'express';
// import { RegisterUser } from '../controllers/user';
// import { signin, signup } from "../handlers/userHandler";

export const usersRoute = express.Router();

// var router = express.Router();

// /* GET home page. */
// router.get('/', (req:Request, res:Response) => {
//   res.send('users page');
// });

// router.post('/', RegisterUser )

// export default router;
>>>>>>> ec7cfc93153b7289cbaeb920e97cba0210996a7e
