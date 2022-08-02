import * as dotenv from 'dotenv';
import { Application } from 'express';
import { ILocalType } from '../interface/ILocals';

class Locals {
  public static config(): ILocalType {
    dotenv.config();

    const port = Number(process.env.PORT) || 8000;
    const url = process.env.SERVER_URL || `http://localhost:${port}`;
    const mongoUrl = process.env.MONGO_URI || '';

    const apiKey = process.env.GOOGLE_MAP_KEY || '';

    const taipeiCenterPot = '25.0445928,121.5428118';
    const nearbyMapUrl =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const detailMapUrl =
      'https://maps.googleapis.com/maps/api/place/details/json';

    return {
      url,
      port,
      mongoUrl,
      apiKey,
      nearbyMapUrl,
      detailMapUrl,
      taipeiCenterPot,
    };
  }

  public static init(_express: Application): Application {
    /* eslint no-param-reassign: ["off"] */
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
