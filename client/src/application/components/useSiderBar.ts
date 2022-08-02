export interface SiderLinkProps {
  id: string;
  name: string;
  path: string;
}

export const siderLink: SiderLinkProps[] = [
  {
    id: '1',
    name: 'home',
    path: '/',
  },
  {
    id: '2',
    name: 'coffee shop list',
    path: '/coffee_shop_list',
  },
];
