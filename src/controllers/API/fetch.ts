import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import {
  requestGetDetailLocation,
  requestGetNearbyLocation,
} from '../../services/infrastructure/googleMap';
import { INearbyLocation } from '../../interface/googleMap/nearbyLocation';
import Locals from '../../provider/Locals';
import { IDetailLocation } from '../../interface/googleMap/detailLocation';

class Fetch {
  private static apiKey: string = Locals.config().apiKey;

  public static async nearbyLocation(req: Request, res: Response) {
    const location = req.query.location as string;
    const radius = req.query.radius as string | number;
    const keyword = req.query.keyword as string;
    const language = req.query.language as string;

    const params: INearbyLocation = {
      location,
      radius,
      keyword,
      language,
    };

    if (!location || !keyword) {
      return res
        .status(404)
        .send({ success: false, message: 'PLEASE CHECK YOUR INPUT.' });
    }

    try {
      const result = await requestGetNearbyLocation(params);
      return res.status(200).send(result.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return res.send(error.message);
      }
      throw error;
    }
  }

  public static async detailLocation(req: Request, res: Response) {
    const language = req.query.language as string;
    const place_id = req.query.place_id as string;

    const params: IDetailLocation = {
      language,
      key: Fetch.apiKey,
      place_id,
    };

    if (!place_id) {
      return res
        .status(404)
        .send({ success: false, message: 'PLEASE INPUT PLACE ID.' });
    }

    try {
      const result = await requestGetDetailLocation(params);
      return res.status(200).send(result.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return res.send(error.message);
      }
      throw error;
    }
  }
}

export default Fetch;
