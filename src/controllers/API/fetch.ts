import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { Error } from 'mongoose';

import {
  requestGetDetailLocation,
  requestGetNearbyLocation,
  requestGetNextPageLocation,
} from '../../services/infrastructure/googleMap';
import Locals from '../../provider/Locals';

import CafeShop from '../../models/cafeShop';
import CafeShopDatabase from '../Database';

import { ICafeShop } from '../../interface/model/cafeShop';
import { INearbyLocation } from '../../interface/googleMap/nearbyLocation';
import { IDetailLocation } from '../../interface/googleMap/detailLocation';

/* eslint no-await-in-loop: "off", no-continue: "off" */
class Fetch {
  private static apiKey: string = Locals.config().apiKey;

  public static async nearbyLocation(req: Request, res: Response) {
    const location = req.query.location as string;
    const radius = req.query.radius as string | number;
    const keyword = req.query.keyword as string;
    const language = req.query.language as string;
    const type = req.query.type as string;

    const params: INearbyLocation = {
      location,
      radius,
      keyword,
      language,
      type,
    };

    if (!location) {
      return res
        .status(404)
        .send({ success: false, message: 'PLEASE CHECK YOUR INPUT.' });
    }

    try {
      const result = await requestGetNearbyLocation(params);

      const data = result.data.results;

      for (let i = 0; i < data.length; i += 1) {
        const existCafeShop = await CafeShop.findOne({
          shopId: data[i].place_id,
        });

        if (existCafeShop) {
          continue;
        }

        const cafeShopData = {
          shopId: data[i].place_id,
          name: data[i].name,
          location: data[i].plus_code.compound_code.split(' ')[1],
          rate: data[i].rating,
          review: data[i].user_ratings_total,
        };

        await CafeShopDatabase.save(cafeShopData);
        await axios.get(
          `${Locals.config().url}/api/detaillocation?place_id=${
            cafeShopData.shopId
          }`
        );
      }

      let token = '';
      if (result.data.next_page_token) {
        token = result.data.next_page_token;
      } else {
        return res.status(200).send({ success: true, message: '解析完成' });
      }

      while (token) {
        const nextPageResults = await requestGetNextPageLocation(token);
        const nextPageData = nextPageResults.data.results;
        for (let j = 0; j < nextPageData.length; j += 1) {
          const existCafeShop = await CafeShop.findOne({
            shopId: nextPageData[j].place_id,
          });

          if (existCafeShop) {
            continue;
          }

          const cafeShopData = {
            shopId: nextPageData[j].place_id,
            name: nextPageData[j].name,
            location: nextPageData[j].plus_code.compound_code.split(' ')[1],
            rate: nextPageData[j].rating,
            review: nextPageData[j].user_ratings_total,
          };

          await CafeShopDatabase.save(cafeShopData);
          await axios.get(
            `${Locals.config().url}/api/detaillocation?place_id=${
              cafeShopData.shopId
            }`
          );
        }
        if (nextPageResults.data.next_page_token) {
          token = nextPageResults.data.next_page_token;
        } else {
          break;
        }
      }

      return res.status(200).send({ success: true, message: '解析完成' });
      // return res.status(200).send(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return res.send(error.message);
      }
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

  public static async detailLocation(req: Request, res: Response) {
    const place_id = req.query.place_id as string;

    const params: IDetailLocation = {
      language: 'zh-TW',
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

      const data = result.data.result;

      if (data.opening_hours) {
        delete data.opening_hours.open_now;
      }

      const updateData: ICafeShop = {
        phone: data.formatted_phone_number
          ? data.formatted_phone_number.split(' ').join('-')
          : null,
        address: data.formatted_address ? data.formatted_address : null,
        website: data.website ? data.website : null,
        url: data.url ? data.url : null,
        opening_hours: data.opening_hours ? data.opening_hours : null,
        geometry: data.geometry ? data.geometry.location : null,
        price_level: data.price_level ? data.price_level : null,
        shop_type: data.types ? data.types : null,
        updatedAt: new Date(Date.now()),
      };

      const cafeShop = await CafeShop.findOne({ shopId: data.place_id });

      if (!cafeShop) {
        return res
          .status(404)
          .send({ success: false, message: '查無此咖啡廳' });
      }

      if (!cafeShop.createdAt) {
        updateData.createdAt = new Date(Date.now());
      }

      await cafeShop.updateOne(updateData, { new: true });

      return res.status(200).send({ success: true, message: '更新成功' });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return res.send(error.message);
      }
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

  public static async fetchAllDetailLocationData(req: Request, res: Response) {
    const shopData = await CafeShop.find();

    try {
      for (let i = 0; i < shopData.length; i += 1) {
        const params: IDetailLocation = {
          language: 'zh-TW',
          key: Fetch.apiKey,
          place_id: shopData[i].shopId as string,
        };

        const result = await requestGetDetailLocation(params);

        const data = result.data.result;

        if (data.opening_hours) {
          delete data.opening_hours.open_now;
        }

        const updateData: ICafeShop = {
          phone: data.formatted_phone_number
            ? data.formatted_phone_number.split(' ').join('-')
            : null,
          address: data.formatted_address ? data.formatted_address : null,
          website: data.website ? data.website : null,
          url: data.url ? data.url : null,
          opening_hours: data.opening_hours ? data.opening_hours : null,
          geometry: data.geometry ? data.geometry.location : null,
          price_level: data.price_level ? data.price_level : null,
          shop_type: data.types ? data.types : null,
          updatedAt: new Date(Date.now()),
        };

        const cafeShop = await CafeShop.findOne({ shopId: data.place_id });

        if (!cafeShop) {
          return res
            .status(404)
            .send({ success: false, message: '查無此咖啡廳' });
        }

        if (!cafeShop.createdAt) {
          updateData.createdAt = new Date(Date.now());
        }

        await cafeShop.updateOne(updateData, { new: true });
      }

      return res.status(200).send({ success: true, message: '更新成功' });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return res.send(error.message);
      }
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

export default Fetch;
