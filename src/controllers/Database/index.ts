import { Error } from 'mongoose';

import CafeShop from '../../models/cafeShop';

class CafeShopDatabase {
  public static async save(data: any) {
    try {
      const cafeShopData = new CafeShop(data);
      return await cafeShopData.save();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw error;
      } else {
        console.log(error);
        throw error;
      }
    }
  }
}

export default CafeShopDatabase;
