import { Spin, Card } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCafeShop from '../application/coffee/useCafeShop';

function HomePage() {
  const { cafeShopData } = useCafeShop();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    cafeShopData.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [cafeShopData]);

  return (
    <Spin spinning={isLoading}>
      <section>
        <h1>Dashboard</h1>
        <div className="location-panel">
          <Card
            title={`總共 ${cafeShopData.length} 家咖啡廳`}
            type="inner"
            extra={<Link to="/coffee_shop_list">More</Link>}
          >
            <p>
              <Link to="/coffee_shop_list?location=中山區">
                中山區{' '}
                {
                  cafeShopData.filter((data) => data.location === '中山區')
                    .length
                }{' '}
                家
              </Link>
            </p>
            <p>
              <Link to="/coffee_shop_list?location=中正區">
                中正區{' '}
                {
                  cafeShopData.filter((data) => data.location === '中正區')
                    .length
                }{' '}
                家
              </Link>
            </p>
            <p>
              <Link to="/coffee_shop_list?location=大同區">
                大同區{' '}
                {
                  cafeShopData.filter((data) => data.location === '大同區')
                    .length
                }{' '}
                家
              </Link>
            </p>

            <p>
              <Link to="/coffee_shop_list?location=信義區">
                信義區{' '}
                {
                  cafeShopData.filter((data) => data.location === '信義區')
                    .length
                }{' '}
                家
              </Link>
            </p>
            <p>
              <Link to="/coffee_shop_list?location=大安區">
                大安區{' '}
                {
                  cafeShopData.filter((data) => data.location === '大安區')
                    .length
                }{' '}
                家
              </Link>
            </p>
            <p>
              <Link to="/coffee_shop_list?location=信義區">
                松山區{' '}
                {
                  cafeShopData.filter((data) => data.location === '信義區')
                    .length
                }{' '}
                家
              </Link>
            </p>
          </Card>
        </div>
      </section>
    </Spin>
  );
}

export default HomePage;
