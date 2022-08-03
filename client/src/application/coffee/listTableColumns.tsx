import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { StarFilled } from '@ant-design/icons';

import { ICafeShop } from '../../interface/coffee/coffeeShop';

export const listTableColumns: ColumnsType<ICafeShop> = [
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
];
