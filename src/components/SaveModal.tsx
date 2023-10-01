import React from 'react';
import { EditSave } from '../types/history-types';
import { Button, Form, Input, Modal, Space } from 'antd';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { setDataAboutRecord } from '../store/inputSlice';
import { useTypedSelector } from '../store/hooks';
import { saveCalculated } from '../store/asyncActions.ts/history';

interface SaveModalProps {
  open: boolean;
  handleCancel: () => void;
}

const SaveModal = ({ open, handleCancel }: SaveModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm<EditSave>();
  const { isLoading, isSuccess, error } = useTypedSelector(
    (store) => store.inputData.newSave
  );
  const { data } = useTypedSelector((store) => store.inputData);

  const onFinish = (values: EditSave) => {
    console.log(values);
    const newData = { ...data, DataAboutRecord: values };
    // dispatch(setDataAboutRecord(newData));
    console.log(newData);
    dispatch(saveCalculated(newData));
    if (isSuccess) {
      console.log('Успешно сохранено');
    } else {
      console.log(error);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      title='Введите данные для сохранения'
      open={open}
      // onOk={handleOk}
      // okText='Сохранить'
      // cancelText='Отмена'
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[]}>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Form.Item
          name='name'
          label='Название'
          rules={[{ required: true, message: 'Заполните название' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='comment'
          label='Комментарий'
          rules={[{ required: true, message: 'Заполните комментарий' }]}>
          <Input.TextArea />
        </Form.Item>
        <Space style={{ alignSelf: 'end' }}>
          <Button type='dashed' onClick={onReset}>
            Очистить
          </Button>
          <Button key='back' onClick={handleCancel}>
            Отмена
          </Button>
          <Button htmlType='submit' type='primary' loading={isLoading}>
            Сохранить
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default SaveModal;
