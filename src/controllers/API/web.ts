import { Request, Response } from 'express';
import { Error, PipelineStage } from 'mongoose';
// import { ICafeShop } from '../../interface/model/cafeShop';

import CafeShop from '../../models/cafeShop';

class Web {
  public static async getAllCafeShop(req: Request, res: Response) {
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

  public static async getCafeShop(req: Request, res: Response) {
    const shopId = req.params.shopId;

    try {
      const result = await CafeShop.findOne({ shopId });

      if (!result) {
        return res
          .status(404)
          .send({ success: false, message: '沒有找到任何咖啡廳', data: {} });
      }

      return res.status(200).send({ success: true, data: result });
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

  public static async downloadXlsx(req: Request, res: Response) {
    const location = req.query.location;

    const aggregateCondition: PipelineStage[] = [];

    const col: PipelineStage.Project = {
      $project: { _id: 0, name: 1, address: 1, phone: 1 },
    };
    const match: PipelineStage.Match = { $match: { location } };

    if (location) {
      aggregateCondition.push(match);
    }
    aggregateCondition.push(col);

    try {
      const result = await CafeShop.aggregate(aggregateCondition);
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

  // public static async formatPhoneNumber(req: Request, res: Response) {
  //   // const cafeShop = await CafeShop.find();

  //   const regex = new RegExp(/abc/);

  //   const text = regex.test('02-2222');

  //   console.log(text);
  // }

  public static async deleteCafeShop(req: Request, res: Response) {
    const shopId = req.params.shopId;

    try {
      const cafeShop = await CafeShop.findOne({ shopId });

      if (!cafeShop) {
        return res
          .status(404)
          .send({ success: false, message: '沒有找到任何咖啡廳' });
      }

      await CafeShop.deleteOne({ shopId });

      return res.status(200).send({ success: true, message: '刪除成功' });
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
