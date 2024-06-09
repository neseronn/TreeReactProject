import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { DownloadOutlined, HistoryOutlined, HomeOutlined, SaveFilled } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, message, Spin } from 'antd';
import DataEntry from './pages/DataEntry/DataEntryPage';
import ResultsPage from './pages/Results/ResultsPage';
import { useRef, useEffect, useState } from 'react';
import generatePDF from 'react-to-pdf';
import { useTypedSelector } from './store/hooks';
import HistoryDrawer from './components/HistoryDrawer';
import Alert from 'antd/es/alert/Alert';
import SaveModal from './components/SaveModal';
import { setNewSaveDefault, setSaveSuccess } from './store/inputSlice';
import { AppDispatch } from './store/store';
import { useDispatch } from 'react-redux';

const { Header, Content, Footer } = Layout;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const ref = useRef<HTMLDivElement | null>(null);
  const { isChanged } = useTypedSelector((store) => store.inputData);
  const data = useTypedSelector((store) => store.inputData.data);
  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      title: <HomeOutlined />,
      key: 'Home',
    },
    {
      title: (
        <NavLink to='/' className={({ isActive }) => (isActive ? 'active-class' : '')}>
          Ввод данных
        </NavLink>
      ),
      key: 'Entry',
    },
  ]);

  const { isLoading: isSaveLoading, isSuccess: isSaveSuccess, error: errorSave } = useTypedSelector((store) => store.inputData);

  const { isLoading: newSaveLoading, isSuccess: newSaveSuccess, error: newSaveError } = useTypedSelector((store) => store.inputData.newSave);

  const { isCalculated } = useTypedSelector((store) => store.resultData);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const closeModal = () => {
    setOpenModal(false);
  };
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (newSaveLoading) {
      messageApi.open({
        key: 'saving',
        type: 'loading',
        content: 'Загрузка...',
        duration: 0,
      });
    }

    newSaveSuccess &&
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

    newSaveError &&
      messageApi.open({
        key: 'saving',
        type: 'error',
        content: newSaveError,
        duration: 2,
      });
  }, [newSaveLoading]);

  useEffect(() => {
    if (isSaveLoading) {
      messageApi.open({
        key: 'saving',
        type: 'loading',
        content: 'Загрузка...',
        duration: 0,
      });
    }

    isSaveSuccess &&
      messageApi
        .open({
          key: 'saving',
          type: 'success',
          content: 'Исходные данные получены',
          duration: 2,
        })
        .then(() => {
          dispatch(setSaveSuccess(false));
        });

    errorSave &&
      messageApi.open({
        key: 'saving',
        type: 'error',
        content: 'Ошибка при получении исходных данных: ' + errorSave,
        duration: 2,
      });
  }, [isSaveLoading]);

  const [openHistory, setOpenHistory] = useState<boolean>(false);
  const showDrawer = () => {
    setOpenHistory(true);
  };
  const onClose = () => {
    setOpenHistory(false);
  };

  useEffect(() => {
    if (isCalculated) {
      if (breadcrumbs.length < 3) {
        setBreadcrumbs([
          ...breadcrumbs,
          {
            key: 'Results',
            title: (
              <NavLink to='/results' className={({ isActive }) => (isActive ? 'active-class' : '')}>
                Результаты расчетов
              </NavLink>
            ),
          },
        ]);
      }
    } else {
      setBreadcrumbs(breadcrumbs.splice(0, 2));
    }
  }, [isCalculated]);

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
          position: 'fixed',
          width: '100vw',
          justifyContent: 'space-between',
        }}>
        <Breadcrumb
          style={{
            flexDirection: 'row',
          }}
          items={breadcrumbs}
        />
        <div style={{ display: 'flex', gap: '16px' }}>
          {location.pathname === '/results' && isCalculated && (
            <Button
              type='primary'
              icon={<SaveFilled />}
              onClick={() => {
                dispatch(setNewSaveDefault());
                setOpenModal(true);
              }}>
              Сохранить расчёт
            </Button>
          )}
          {location.pathname === '/results' && isCalculated && (
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
        </div>
      </Header>
      <Content
        style={{
          padding: '66px 30px 0 30px',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '14px',
          }}>
          {data.DataAboutRecord?.date && data.DataAboutRecord?.id && (
            <Alert
              message={"Исходные данные были взяты из '" + data.DataAboutRecord.name + "' от " + new Date(data.DataAboutRecord.date).toLocaleString()}
              description={data.DataAboutRecord.comment}
              type={'info'}
              showIcon
            />
          )}

          {contextHolder}

          {openModal && <SaveModal open={openModal} handleCancel={closeModal} />}

          <Spin size='large' tip='Загрузка...' spinning={isSaveLoading}>
            <div
              ref={ref}
              style={{
                width: '100%',
                maxWidth: 'max-content',
                margin: '0 auto',
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                columnGap: 20,
                transition: 'width 0.5s ease-in-out',
              }}>
              <Routes>
                <Route path='/' element={<DataEntry />} />
                <Route path='/results' element={<ResultsPage />} />
              </Routes>
            </div>
          </Spin>
        </div>
      </Content>
      <HistoryDrawer open={openHistory} onClose={onClose} />
      <Footer
        style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
          justifyContent: 'center',
          borderColor: '',
          color: '#686868',
          padding: '16px',
          fontSize: '10px',
        }}>
        ©2024
        <div>Developed by: </div>
        <br />
        <div>Frontend: Avdeenko E.E., </div>
        <div>Backend: Shitiy A.D.</div>
      </Footer>
    </Layout>
  );
}

export default App;
