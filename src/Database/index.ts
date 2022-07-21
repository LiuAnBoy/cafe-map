import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

import Locals from '../provider/Locals';

export class Database {
  public static init() {
    const dsn = Locals.config().mongoUrl;

    mongoose.connect(dsn, (error) => {
      if (error instanceof MongoError) {
        console.log(error);
        throw error;
      } else {
        console.log('\x1b[33m%s\x1b[0m', 'Database   :: MongoDB Connected');
      }
    });
  }
}

export default mongoose;
