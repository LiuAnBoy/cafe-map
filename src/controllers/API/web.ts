import { Request, Response } from 'express';
import { Error } from 'mongoose';

import CafeShop from '../../models/cafeShop';

class Web {
  public static async getShopData(req: Request, res: Response) {
    const location = req.query.location;

    try {
      if (location) {
        const result = await CafeShop.find({ location });
        return res.status(200).send(result);
      }
      const result = await CafeShop.find();
      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return res.send(error.message);
      }
      console.log(error);
      return res
        .status(500)
        .send({ success: false, message: 'Internal Server Error' });
    }
  }
}

export default Web;
