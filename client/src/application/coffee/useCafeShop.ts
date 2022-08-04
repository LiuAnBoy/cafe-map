import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import moment from 'moment';

import { ICafeShop } from '../../interface/coffee/coffeeShop';
import {
  requestGetCoffeeShop,
  requestDownloadXlsx,
  requestDeleteCoffeeShop,
} from '../../service/coffee';
import { AxiosError } from 'axios';

function useCafeShop() {
  const [searchParams] = useSearchParams();

  const location = searchParams.get('location');
  const [cafeShopData, setCafeShopData] = useState<ICafeShop[]>([]);

  const getAllCafeShop = async () => {
    try {
      const result = await requestGetCoffeeShop(location);
      setCafeShopData(result.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return error.response;
      }
      console.log(error);
      return error;
    }
  };

  const downloadSheet = async (location: string | null) => {
    try {
      const result = await requestDownloadXlsx(location);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(result.data);

      XLSX.utils.book_append_sheet(wb, ws, '咖啡廳');

      const DateNow = moment(new Date()).format('YYYY-MM-DD');

      return XLSX.writeFile(
        wb,
        `咖啡廳-${location || '全區域'}-${DateNow}.xlsx`
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return error.response;
      }
      console.log(error);
      return error;
    }
  };

  const deleteCafeShop = async (shopId: string) => {
    try {
      const result = await requestDeleteCoffeeShop(shopId);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return error.response;
      }
    }
  };

  /* eslint  react-hooks/exhaustive-deps: off */
  useEffect(() => {
    getAllCafeShop();
  }, [location]);

  return { cafeShopData, downloadSheet, deleteCafeShop, getAllCafeShop };
}

export default useCafeShop;
