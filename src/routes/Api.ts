import { Request, Response, Router } from 'express';
import Fetch from '../controllers/API/fetch';
import Web from '../controllers/API/web';

const router = Router();

router.get('/', (req: Request, res: Response) => res.send('Hello world'));

router.get('/nearbylocation', Fetch.nearbyLocation);
router.get('/detaillocation', Fetch.detailLocation);
router.get('/fetchAllDetailLocation', Fetch.fetchAllDetailLocationData);

router.get('/cafeshop', Web.getAllCafeShop);
router.get('/cafeshop/:shopId', Web.getCafeShop);
router.get('/downloadXlsx', Web.downloadXlsx);

router.delete('/cafeshop/delete/:shopId', Web.deleteCafeShop);
// TODO: format Phone number
// router.get('/formatphonenumber', Web.formatPhoneNumber);

export default router;
