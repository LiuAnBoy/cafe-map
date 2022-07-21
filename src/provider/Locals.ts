import * as dotenv from 'dotenv';
import { Application } from 'express';
import { ILocalType } from '../interface/ILocals';

class Locals {
  public static config(): ILocalType {
    dotenv.config();

    const port = Number(process.env.PORT) || 8000;
    const url = process.env.SERVER_URL || `http://localhost:${port}`;
    const mongoUrl = process.env.MONGO_URI || '';

    return { url, port, mongoUrl };
  }

  public static init(_express: Application): Application {
    /* eslint no-param-reassign: ["off"] */
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
