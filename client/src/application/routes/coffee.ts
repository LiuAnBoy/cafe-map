import RoutesProps from '../../domain/route';

import CoffeePage from '../../pages/Coffee';

const coffeeRoutes: RoutesProps[] = [
  {
    path: '/coffee_shop_list',
    view: CoffeePage,
  },
];

export default coffeeRoutes;
