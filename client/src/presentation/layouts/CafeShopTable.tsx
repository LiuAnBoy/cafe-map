import { FC, useState } from 'react';
import { Table, Space, Modal } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { StarFilled } from '@ant-design/icons';

import CustomButton from '../components/CustomButton';
import { CafeShopTableProps } from '../../interface/layouts/CafeShopTable';
import { ICafeShop } from '../../interface/coffee/coffeeShop';

const CafeShopTable: FC<CafeShopTableProps> = ({
  isOpen,
  handleDeleteModalClose,
  handleDeleteModalOpen,
  handleDelete,
  ...props
}) => {
  const [shopId, setId] = useState<string>('');
  const [shopName, setShopName] = useState<string>('');

  const handleModalOpen = (id: string, name: string) => {
    handleDeleteModalOpen();
    setShopName(name);
    setId(id);
  };

  const handleModalClose = () => {
    handleDeleteModalClose();
    setId('');
    setShopName('');
  };

  const listTableColumns: ColumnsType<ICafeShop> = [
    {
      title: '店家名稱',
      dataIndex: 'name',
      width: '30%',
      render: (value, record) => (
        <span>
          <a target="_blank" rel="noreferrer" href={record.url}>
            {value}
          </a>
        </span>
      ),
    },
    {
      title: '電話',
      dataIndex: 'phone',
      render: (value) => <span>{value || 'N/A'}</span>,
    },
    {
      title: '地址',
      dataIndex: 'address',
      sorter: (a, b) => a.location?.localeCompare(b.location),
    },
    {
      title: '評等',
      dataIndex: 'rate',
      render: (value, record) => (
        <Space>
          <span>
            {value}
            <StarFilled />
          </span>
          <span>({record.review})</span>
        </Space>
      ),
    },
    {
      title: 'Action',
      render: (value, record) => (
        <Space>
          <CustomButton
            label="刪除"
            type="primary"
            danger
            onClick={() => handleModalOpen(record.shopId, record.name)}
          />
        </Space>
      ),
    },
  ];

  const handleCafeShopDelete = () => {
    handleDelete(shopId);
    handleModalClose();
  };

  return (
    <>
      <Table
        {...props}
        columns={listTableColumns}
        rowKey={(record) => record.shopId}
      />
      <Modal
        title="警告"
        centered
        visible={isOpen}
        onCancel={handleModalClose}
        onOk={handleCafeShopDelete}
        okText="確認"
        cancelText="取消"
      >
        確定要刪除 <span>{shopName}</span> 的資訊?
      </Modal>
    </>
  );
};

export default CafeShopTable;
