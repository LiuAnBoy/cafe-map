import { Application } from 'express';

import ApiRouter from '../routes/Api';

/* eslint class-methods-use-this: "off" */
class Routes {
  public mountApi(_express: Application): Application {
    console.log('Routes     :: Mount API Routes');
    return _express.use('/api', ApiRouter);
  }
}

export default new Routes();
