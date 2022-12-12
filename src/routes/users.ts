import express, {Response, Request} from 'express';
import { RegisterUser } from '../controllers/user';


var router = express.Router();

/* GET home page. */
router.get('/', (req:Request, res:Response) => {
  res.send('users page');
});

router.post('/signup', RegisterUser )

export default router;
