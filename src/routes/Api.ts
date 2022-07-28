import { Request, Response, Router } from 'express';
import Fetch from '../controllers/API/fetch';

const router = Router();

router.get('/', (req: Request, res: Response) => res.send('Hello world'));

router.get('/nearbylocation', Fetch.nearbyLocation);
router.get('/detaillocation', Fetch.detailLocation);

export default router;
