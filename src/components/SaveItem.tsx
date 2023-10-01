import {
  CalendarOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, List, Popconfirm, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Save } from '../types/history-types';

interface SaveItemProps {
  item: Save;
  selectSave: (id: number) => void;
}

const SaveItem = ({ item, selectSave }: SaveItemProps) => {
  return (
    <List.Item
      actions={[
        <Space>
          <CalendarOutlined />
          {new Date(item.date).toLocaleString('ru-RU')}
        </Space>,
      ]}
      extra={[
        <Button
          key={'select' + item.id}
          type='link'
          size='large'
          onClick={() => selectSave(item.id)}>
          Выбрать
        </Button>,
        <Popconfirm
          key={'Popconfirm' + item.id}
          title='Вы действительно хотите удалить это сохранение?'
          okText='Да'
          cancelText='Отмена'
          placement='left'
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          // onConfirm={handleOk}
          // okButtonProps={{ loading: confirmLoading }}
        >
          <Button type='link' size='large' icon={<DeleteOutlined />} danger />
        </Popconfirm>,
      ]}>
      <List.Item.Meta
        title={item.name}
        description={<Typography.Text>{item.comment}</Typography.Text>}
      />
    </List.Item>
  );
};

export default SaveItem;
