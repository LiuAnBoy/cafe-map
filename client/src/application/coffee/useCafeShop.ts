import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { ICafeShop } from '../../interface/coffee/coffeeShop';
import { requestGetCoffeeShop } from '../../service/coffee';

function useCafeShop() {
  const [searchParams] = useSearchParams();

  const location = searchParams.get('location');
  const [cafeShop, setCafeShop] = useState<ICafeShop[]>([]);

  const getCafeShop = async () => {
    try {
      const result = await requestGetCoffeeShop(location);
      setCafeShop(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* eslint  react-hooks/exhaustive-deps: off */
  useEffect(() => {
    getCafeShop();
  }, [location]);

  return { cafeShop };
}

export default useCafeShop;
