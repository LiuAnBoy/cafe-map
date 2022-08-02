import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import routes from './application/routes';
import RoutesProps from './domain/route';

import NavBar from './presentation/layouts/NavBar';
import SiderBar from './presentation/layouts/SiderBar';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <NavBar />
      <Layout>
        <SiderBar />
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: 'calc(100vh - 64px)',
            }}
          >
            <Routes>
              {routes.map((route: RoutesProps) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.view />}
                />
              ))}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
