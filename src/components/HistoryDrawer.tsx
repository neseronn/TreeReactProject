import React, { useEffect, useState } from 'react';
import { Alert, Drawer, Empty, List, Spin, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../store/hooks';
import { AppDispatch } from '../store/store';
import { deleteSaveById, getSaves } from '../store/asyncActions.ts/history';
import { getSaveById } from '../store/asyncActions.ts/inputData';
import SaveItem from './SaveItem';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { setDeleteError, setDeleteSuccess } from '../store/historySlice';

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const HistoryDrawer = ({ open, onClose }: HistoryDrawerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isSuccess, saves } = useTypedSelector(
    (store) => store.historyData
  );

  const { isSuccess: isSaveSuccess } = useTypedSelector(
    (store) => store.inputData
  );
  const [messageVisible, setMessageVisible] = useState(false);
  const { deleteLoading, deleteSuccess, deleteError } = useTypedSelector(
    (store) => store.historyData
  );

  const id = useTypedSelector(
    (store) => store.inputData.data.DataAboutRecord?.id
  );

  useEffect(() => {
    open && dispatch(getSaves());
    if (!open) {
      dispatch(setDeleteSuccess(false));
      dispatch(setDeleteError(false));
    }
  }, [open]);

  useEffect(() => {
    if (!!isSaveSuccess) {
      if (location.pathname !== '/') {
        navigate('/');
      }
      onClose();
    }
  }, [isSaveSuccess]);

  useEffect(() => {
    deleteLoading && setMessageVisible(true);
    if (deleteSuccess) dispatch(getSaves());
  }, [deleteLoading]);

  const onSelectSavedData = (id: number | null) => {
    id && dispatch(getSaveById(id));
  };

  const handleDeleteSave = (id: number | null) => {
    id && dispatch(deleteSaveById(id));
  };

  const handleCloseMessage = () => {
    setMessageVisible(false);
  };

  return (
    <Drawer
      size='large'
      title='Сохраненные вычисления'
      placement='right'
      onClose={onClose}
      open={open}>
      {isSuccess && saves.length === 0 ? (
        <Empty
          description={
            <span style={{ color: '#80878f' }}>Нет сохраненных данных</span>
          }
        />
      ) : isLoading ? (
        <Spin size='large' style={{ width: '100%' }} />
      ) : (
        isSuccess && (
          <>
            <Spin spinning={deleteLoading} size='large' tip='Идёт удаление...'>
              <Space direction='vertical' style={{ width: '100%' }}>
                {messageVisible && deleteSuccess && (
                  <Alert
                    afterClose={handleCloseMessage}
                    message='Сохранение успешно удалено'
                    type='success'
                    closable
                    showIcon
                  />
                )}
                {messageVisible && deleteError && (
                  <Alert
                    afterClose={handleCloseMessage}
                    message='Ошибка удаления'
                    description={deleteError}
                    type='error'
                    closable
                    showIcon
                  />
                )}
                <List
                  itemLayout='vertical'
                  dataSource={saves}
                  bordered
                  renderItem={(item) => (
                    <SaveItem
                      key={'saveitem' + item.id}
                      currentId={id}
                      item={item}
                      selectSave={onSelectSavedData}
                      handleDelete={handleDeleteSave}
                    />
                  )}
                />
              </Space>
            </Spin>
          </>
        )
      )}
    </Drawer>
  );
};

export default HistoryDrawer;
