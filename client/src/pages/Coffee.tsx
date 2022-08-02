import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import CustomButton from '../presentation/components/CustomButton';
import CustomSelect from '../presentation/components/CustomSelect';
import { selectOptions } from '../application/coffee/selectOptions';
import { listTableColumns } from '../application/coffee/listTableColumns';

import useCafeShop from '../application/coffee/useCafeShop';

const CoffeePage = () => {
  const navigate = useNavigate();

  const { cafeShop } = useCafeShop();

  const handleChange = (value: string) => {
    if (value) {
      navigate(`?location=${value}`);
    } else {
      navigate('');
    }
  };

  return (
    <section>
      <h1>Coffee Shop List</h1>
      <div className="coffee-panel">
        <div>
          地區：
          <CustomSelect options={selectOptions} onChange={handleChange} />
        </div>
        <CustomButton label="匯出資料" type="primary" />
      </div>
      <Table
        dataSource={cafeShop}
        columns={listTableColumns}
        rowKey={(record) => record.shopId as string}
      />
    </section>
  );
};

export default CoffeePage;
