import express, {Response, Request} from 'express';


var router = express.Router();

/* GET home page. */
router.get('/', (req:Request, res:Response) => {
  res.send('index page');
});

export default router;
