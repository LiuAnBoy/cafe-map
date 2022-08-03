import express, { Application } from 'express';
import path from 'path';

import Locals from './Locals';
// import ExceptionHandler from '../services/exception/handler';
import Bootstrap from '../middlewares/index';
import Routes from './Routes';

class Express {
  public express: Application;

  constructor() {
    this.express = express();

    this.mountDotEnv();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  private mountDotEnv(): void {
    this.express = Locals.init(this.express);
  }

  private mountRoutes(): void {
    this.express = Routes.mountApi(this.express);
  }

  /**
   * Mounts all the defined middlewares
   */
  private mountMiddlewares(): void {
    this.express = Bootstrap.init(this.express);
  }

  public init() {
    const port: number = Locals.config().port;

    // // Registering Exception / Error Handlers
    // this.express.use(ExceptionHandler.errorHandler);

    // Server statics assets in production
    if (process.env.NODE_ENV === 'production') {
      // Set static folder
      this.express.use(express.static('client/build'));

      this.express.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
      });
    }

    // Start the server on the specified port
    this.express
      .listen(port, () => {
        return console.log(
          '\x1b[33m%s\x1b[0m',
          `Server     :: Running SERVER @ 'http://localhost:${port}'`
        );
      })
      .on('error', (_error) => {
        return console.log('Error: ', _error.message);
      });
  }
}

export default new Express();
