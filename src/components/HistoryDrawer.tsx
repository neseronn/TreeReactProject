import React, { useEffect, useState } from 'react';
import { Alert, Drawer, Empty, List, Spin, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../store/hooks';
import { AppDispatch } from '../store/store';
import { getSaves } from '../store/asyncActions.ts/history';
import { getSaveById } from '../store/asyncActions.ts/inputData';
import SaveItem from './SaveItem';
import { useNavigate } from 'react-router';

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const HistoryDrawer = ({ open, onClose }: HistoryDrawerProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isSuccess, saves } = useTypedSelector(
    (store) => store.historyData
  );

  const {
    isLoading: isSaveLoading,
    isSuccess: isSaveSuccess,
    error: errorSave,
  } = useTypedSelector((store) => store.inputData);

  const id = useTypedSelector(
    (store) => store.inputData.data.DataAboutRecord?.id
  );

  useEffect(() => {
    open && dispatch(getSaves());
  }, [open]);

  useEffect(() => {
    onClose();
  }, [isSaveSuccess]);

  const onSelectSavedData = (id: number | null) => {
    id && dispatch(getSaveById(id));
  };

  const handleDeleteSave = (id: number | null) => {
    // id && dispatch(getSaveById(id));
    // navigate('/');
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
          </>
        )
      )}
    </Drawer>
  );
};

export default HistoryDrawer;
