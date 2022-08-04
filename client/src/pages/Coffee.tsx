import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CustomButton from '../presentation/components/CustomButton';
import CustomSelect from '../presentation/components/CustomSelect';
import useMessage from '../application/components/useMesaage';
import { selectOptions } from '../application/coffee/selectOptions';

import useCafeShop from '../application/coffee/useCafeShop';
import CafeShopTable from '../presentation/layouts/CafeShopTable';

const CoffeePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const location = searchParams.get('location');

  const { cafeShopData, downloadSheet, deleteCafeShop, getAllCafeShop } =
    useCafeShop();
  const { successMessage, errorMessage } = useMessage();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLocationChange = (value: string) => {
    if (value) {
      navigate(`?location=${value}`);
    } else {
      navigate('');
    }
  };

  const handleDeleteModalOpen = () => {
    setIsOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async (shopId: string) => {
    setIsLoading(true);
    const res = await deleteCafeShop(shopId);
    if (res?.status !== 200) {
      return errorMessage(res?.data.message);
    }
    setIsLoading(false);
    successMessage('刪除成功');
    return getAllCafeShop();
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
        <CafeShopTable
          dataSource={cafeShopData}
          isOpen={isOpen}
          handleDeleteModalOpen={handleDeleteModalOpen}
          handleDeleteModalClose={handleDeleteModalClose}
          handleDelete={handleDelete}
        />
      </Spin>
    </section>
  );
};

export default CoffeePage;
