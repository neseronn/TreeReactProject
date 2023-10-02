import { Routes, Route, useLocation, Link } from 'react-router-dom';
import {
  DownloadOutlined,
  HistoryOutlined,
  HomeOutlined,
  SaveFilled,
  SaveOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, message } from 'antd';
import DataEntry from './pages/DataEntry';
import ResultsPage from './pages/ResultsPage';
import { useRef, useEffect, useState } from 'react';
import generatePDF from 'react-to-pdf';
import { useTypedSelector } from './store/hooks';
import HistoryDrawer from './components/HistoryDrawer';
import Alert from 'antd/es/alert/Alert';
import SaveModal from './components/SaveModal';
import { setSaveSuccess } from './store/inputSlice';
import { AppDispatch } from './store/store';
import { useDispatch } from 'react-redux';

const { Header, Content, Footer } = Layout;

const breadcrumbNames: Record<string, string> = {
  '/results': 'Результаты расчетов',
};

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const ref = useRef<HTMLDivElement | null>(null);
  const { isSuccess, isChanged } = useTypedSelector((store) => store.inputData);
  const data = useTypedSelector((store) => store.inputData.data);
  const [menu, setMenu] = useState([{ key: 0, label: 'Ввод данных' }]);

  const {
    isLoading: saveLoading,
    isSuccess: saveSuccess,
    error: saveError,
  } = useTypedSelector((store) => store.inputData.newSave);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const closeModal = () => {
    setOpenModal(false);
  };
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (saveLoading) {
      messageApi.open({
        key: 'saving',
        type: 'loading',
        content: 'Загрузка...',
        duration: 0,
      });
    }

    saveSuccess &&
      messageApi
        .open({
          key: 'saving',
          type: 'success',
          content: 'Исходные данные сохранены',
          duration: 2,
        })
        .then(() => {
          dispatch(setSaveSuccess(false));
        });

    saveError &&
      messageApi.open({
        key: 'saving',
        type: 'error',
        content: saveError,
        duration: 2,
      });
  }, [saveLoading]);

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

  // useEffect(() => {
  //   if (isSuccess) {
  //     setMenu([
  //       {
  //         key: 0,
  //         label: `Вычисление от ${new Date(
  //           DataAboutRecord.date
  //         ).toLocaleString()}`,
  //       },
  //     ]);
  //   }
  // }, [isSuccess]);

  useEffect(() => {}, [isChanged]);

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
          items={menu}
        />

        {location.pathname === '/results' && (
          <Button
            type='primary'
            icon={<SaveFilled />}
            onClick={() => {
              setOpenModal(true);
            }}>
            Сохранить расчёт
          </Button>
        )}

        {location.pathname === '/results' && (
          <Button
            type='primary'
            icon={<DownloadOutlined />}
            onClick={() =>
              generatePDF(ref, {
                filename: 'Расчёты от ' + new Date().toLocaleString() + '.pdf',
              })
            }>
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
            rowGap: '14px',
          }}>
          {data.DataAboutRecord?.date && data.DataAboutRecord?.id && (
            <Alert
              message={
                "Исходные данные были взяты из '" +
                data.DataAboutRecord.name +
                "' от " +
                new Date(data.DataAboutRecord.date).toLocaleString()
              }
              description={data.DataAboutRecord.comment}
              type={isChanged ? 'warning' : 'info'}
              showIcon
            />
          )}

          {contextHolder}

          {openModal && (
            <SaveModal open={openModal} handleCancel={closeModal} />
          )}

          <div
            ref={ref}
            style={{
              width: '100%',
              maxWidth: 'max-content',
              display: 'flex',
              margin: '0 auto 20px',
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
      <HistoryDrawer open={openHistory} onClose={onClose} />
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
