import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import CommonForm from './components/CommonForm';
import DataEntry from './pages/DataEntry';
import ResultsPage from './pages/ResultsPage';
import { useEffect } from 'react';

const { Header, Content, Footer } = Layout;

const breadcrumbNames: Record<string, string> = {
  '/results': 'Результаты расчетов',
};

function App() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  useEffect(() => {
    // console.log(extraBreadcrumbItems);
    // console.log(breadcrumbItems);
  }, []);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    console.log(url);
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNames[url]}</Link>,
    };
  });

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      key: 'Home',
    },
    {
      title: <Link to='/'>Ввод данных</Link>,
      key: 'Entry',
    },
  ].concat(extraBreadcrumbItems);

  return (
    <Layout className='layout' style={{ height: '100%' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          maxHeight: '48px',
          overflow: 'hidden',
        }}>
        <Menu
          mode='horizontal'
          defaultSelectedKeys={['0']}
          className='menu'
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            // maxHeight: '48px',
          }}
          items={[{ key: 0, label: 'Главная' }]}
        />
        <Button>История</Button>
      </Header>
      <Content
        style={{
          padding: '0 20px',
        }}>
        <Breadcrumb
          style={{
            margin: '10px 0',
          }}
          items={breadcrumbItems}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <div
            style={{
              // padding: 20,
              // minHeight: 600,
              background: '#e1e1e1',
              width: '100%',
              display: 'flex',
              columnGap: 20,
              transition: 'width 0.5s ease-in-out',
              overflow: 'hidden',
            }}>
            <Routes>
              <Route path='/' element={<DataEntry />} />
              {/* <Route path='/:id' element={<Page />} /> */}
              <Route path='/results' element={<ResultsPage />} />
              {/* <Route
                                path='/results/:id'
                                element={<ResultsPage />}
                            /> */}
            </Routes>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          color: '#686868',
        }}>
        ©2023
      </Footer>
    </Layout>
  );
}

export default App;
