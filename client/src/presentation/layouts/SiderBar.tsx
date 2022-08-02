import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import {
  siderLink,
  SiderLinkProps,
} from '../../application/components/useSiderBar';

const { Sider } = Layout;

const SiderBar: FC = () => {
  const location = useLocation();

  const handleSelectedKey = () => {
    const path = location.pathname;
    const key = siderLink.find(
      (link: SiderLinkProps) => link.path === path
    ) as SiderLinkProps;

    return key.id;
  };

  return (
    <Sider width={200}>
      <Menu
        theme="dark"
        mode="inline"
        style={{ height: 'calc(100vh - 64px)', borderRight: 0 }}
        selectedKeys={[handleSelectedKey()]}
      >
        {siderLink.map((link) => (
          <Menu.Item key={link.id}>
            <Link to={`${link.path}`}>{link.name.toLocaleUpperCase()}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SiderBar;
