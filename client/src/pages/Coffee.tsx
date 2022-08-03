import { useEffect, useState } from 'react';
import { Table, Spin } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CustomButton from '../presentation/components/CustomButton';
import CustomSelect from '../presentation/components/CustomSelect';
import { selectOptions } from '../application/coffee/selectOptions';
import { listTableColumns } from '../application/coffee/listTableColumns';

import useCafeShop from '../application/coffee/useCafeShop';

const CoffeePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const location = searchParams.get('location');

  const { cafeShopData, downloadSheet } = useCafeShop();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLocationChange = (value: string) => {
    if (value) {
      navigate(`?location=${value}`);
    } else {
      navigate('');
    }
  };

  useEffect(() => {
    cafeShopData.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [cafeShopData]);

  return (
    <section>
      <h1>Coffee Shop List</h1>
      <div className="coffee-panel">
        <div>
          地區：
          <CustomSelect
            options={selectOptions}
            value={location || ''}
            onChange={handleLocationChange}
          />
        </div>
        <CustomButton
          label="匯出資料"
          type="primary"
          onClick={() => downloadSheet(location)}
        />
      </div>
      <Spin spinning={isLoading}>
        <Table
          dataSource={cafeShopData}
          columns={listTableColumns}
          rowKey={(record) => record.shopId}
        />
      </Spin>
    </section>
  );
};

export default CoffeePage;
