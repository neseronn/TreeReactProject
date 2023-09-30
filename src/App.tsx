import { Routes, Route, useLocation, Link } from 'react-router-dom';
import {
  DownloadOutlined,
  HistoryOutlined,
  HomeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Drawer, Empty } from 'antd';
import CommonForm from './components/CommonForm';
import DataEntry from './pages/DataEntry';
import ResultsPage from './pages/ResultsPage';
import React, { useRef, useEffect, useState } from 'react';
import generatePDF from 'react-to-pdf';

const { Header, Content, Footer } = Layout;

const breadcrumbNames: Record<string, string> = {
  '/results': 'Результаты расчетов',
};

function App() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const ref = useRef<HTMLDivElement | null>(null);

  const [openHistory, setOpenHistory] = useState<boolean>(false);
  const showDrawer = () => {
    setOpenHistory(true);
  };
  const onClose = () => {
    setOpenHistory(false);
  };

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
    <Layout
      className='layout'
      style={{
        height: '100%',
        minHeight: '100vh',
      }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          maxHeight: '48px',
          overflow: 'hidden',
          columnGap: '10px',
          zIndex: 11,
          boxShadow: 'rgba(90, 90, 90, 0.2) 0px -10px 20px 1px',
        }}>
        <Menu
          mode='horizontal'
          defaultSelectedKeys={['0']}
          className='menu'
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          items={[{ key: 0, label: 'Главная' }]}
        />
        {location.pathname === '/results' && (
          <Button
            type='primary'
            icon={<DownloadOutlined />}
            onClick={() => generatePDF(ref, { filename: 'page.pdf' })}>
            Скачать PDF
          </Button>
        )}

        <Button icon={<HistoryOutlined />} onClick={showDrawer}>
          История
        </Button>
      </Header>
      <Content
        style={{
          padding: '12px 30px 0 30px',
        }}>
        <Breadcrumb
          style={{
            marginBottom: '12px',
          }}
          items={breadcrumbItems}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <div
            ref={ref}
            style={{
              width: '100%',
              maxWidth: 'max-content',
              display: 'flex',
              margin: '0 auto',
              justifyContent: 'center',
              columnGap: 20,
              transition: 'width 0.5s ease-in-out',
            }}>
            <Routes>
              <Route path='/' element={<DataEntry />} />
              {/* <Route path='/:id' element={<DataEntry />} /> */}
              <Route path='/results' element={<ResultsPage />} />
            </Routes>
          </div>
        </div>
      </Content>
      <Drawer
        size='large'
        title='Сохраненные вычисления'
        placement='right'
        onClose={onClose}
        open={openHistory}>
        <Empty
          description={
            <span style={{ color: '#80878f' }}>Нет сохраненных данных</span>
          }
        />
      </Drawer>
      {/* <Footer
        style={{
          textAlign: 'center',
          color: '#686868',
          padding: '16px',
        }}>
        ©2023
      </Footer> */}
    </Layout>
  );
}

export default App;
