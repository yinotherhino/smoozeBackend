import express, {Response, Request} from 'express';
import { RegisterUser } from '../controllers/user';
// import { signin, signup } from "../handlers/userHandler";

export const usersRoute = express.Router();

var router = express.Router();

/* GET home page. */
router.get('/', (req:Request, res:Response) => {
  res.send('users page');
});

router.post('/', RegisterUser )

export default router;
