import { TableProps } from 'antd';
import { ICafeShop } from '../coffee/coffeeShop';

export interface CafeShopTableProps extends TableProps<ICafeShop> {
  handleDeleteModalOpen: () => void;
  handleDeleteModalClose: () => void;
  handleDelete: (shopId: string) => void;
  isOpen: boolean;
}
