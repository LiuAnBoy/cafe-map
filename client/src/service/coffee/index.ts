import { getRequest } from '../../application/http';
import { ICafeShop } from '../../interface/coffee/coffeeShop';

export const requestGetCoffeeShop = async (location?: string | null) => {
  const path = '/api/cafeshop';
  const params = { location };
  const result = await getRequest<ICafeShop[]>(path, params);

  return result;
};
