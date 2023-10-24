import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Space } from 'antd';
import {
  ChangedCommonInputData,
  CommonInputData,
} from '../../../types/index-types';
import {
  changeCommonData,
  clearAllData,
  setIsChanged,
} from '../../../store/inputSlice';
import { useTypedSelector } from '../../../store/hooks';
import { Typography } from 'antd';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { techSystem } from '../../../common/index';
import { setCalculated } from '../../../store/resultSlice';
import { ClearOutlined } from '@ant-design/icons';
const { Title } = Typography;

const CommonForm: React.FC<any> = ({ setIsVisible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { DataCalculated, DataAboutRecord } = useTypedSelector(
    (store) => store.inputData.data
  );
  const isSuccess = useTypedSelector((store) => store.inputData.isSuccess);
  const isChanged = useTypedSelector((store) => store.inputData.isChanged);
  const isCalculated = useTypedSelector(
    (store) => store.resultData.isCalculated
  );

  const [form] = Form.useForm<CommonInputData>();
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(true);
  const [disabled, setDisabled] = useState(isCalculated || false);

  const [savedValues, setSavedValues] = useState<null | CommonInputData>(null);

  // Обработчик изменения значений в форме
  const handleFormValuesChange = (
    changedValues: ChangedCommonInputData,
    allValues: CommonInputData
  ) => {
    if (isSuccess) {
      if (JSON.stringify(allValues) !== JSON.stringify(savedValues)) {
        dispatch(setIsChanged(true));
      } else if (
        isChanged &&
        JSON.stringify(allValues) === JSON.stringify(savedValues)
      ) {
        dispatch(setIsChanged(false));
      }
    }
    dispatch(changeCommonData(changedValues));
    if (isCalculated) {
      if (
        'Company' in changedValues ||
        'CuttingArea' in changedValues ||
        'N' in changedValues ||
        'TotalStock' in changedValues ||
        'AvgStock' in changedValues ||
        'ZoneLength' in changedValues ||
        'ShiftsNumber' in changedValues ||
        'replaceableMachinePerfomance' in changedValues
      )
        dispatch(setCalculated(false));
    }
    console.log('handleFormValuesChange: сохранены в redux');
  };

  // Для обновления количества месяцев при добавлении/удалении карточки месяца
  useEffect(() => {
    form.setFieldValue('CountMonth', DataCalculated?.CountMonth);
  }, [DataCalculated?.CountMonth]);

  // Валидация, открытие второй формы
  useEffect(() => {
    console.log(values);
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
        console.log('Всё введено, можно подтверждать');
        // console.log('Данные сохранены в redux');
      },
      () => {
        setSubmittable(false);
        // ставить таблицу disabled
      }
    );
  }, [values]);

  useEffect(() => {
    console.log('Данные при первом рендере:');
    console.log(values);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // form.resetFields();
      setSavedValues(DataCalculated);
      setDisabled(true);
      form.setFieldsValue(DataCalculated);
    }
  }, [isSuccess]);

  const onFinish = (values: CommonInputData) => {
    setDisabled(true);
    // console.log(values);
    // dispatch(addTechSystem(values));
    // form.resetFields();
  };

  const onReset = () => {
    dispatch(clearAllData());
    setDisabled(false);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={DataCalculated}
      onValuesChange={handleFormValuesChange}
      autoComplete='off'
      layout='vertical'
      style={{
        width: 350,
        minWidth: 350,
        padding: 20,
        backgroundColor: 'white',
        margin: '0 auto',
        borderRadius: 6,
        height: 'max-content',
      }}>
      <Title level={4} style={{ textAlign: 'center' }}>
        Введите общие данные
      </Title>

      <Form.Item
        label='Предприятие'
        name='CuttingArea'
        rules={[
          {
            required: true,
            message: 'Заполните предприятие!',
          },
        ]}>
        <Input
          value={DataCalculated?.CuttingArea}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Лесосека, номер квартала'
        name='Company'
        rules={[
          {
            required: true,
            message: 'Заполните лесосеку и номер квартала!',
          },
        ]}>
        <Input
          value={DataCalculated?.Company}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Количество месяцев'
        name='CountMonth'
        rules={[
          {
            required: true,
            message: 'Введите количество месяцев!',
          },
        ]}>
        <InputNumber
          disabled={disabled}
          min={1}
          max={12}
          value={DataCalculated?.CountMonth}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Первый месяц'
        name='FirstMonth'
        rules={[
          {
            required: true,
            message: 'Введите первый месяц!',
          },
        ]}>
        <InputNumber
          min={1}
          max={12}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Марка'
        name='markCar'
        rules={[
          {
            required: true,
            message: 'Введите марку машины!',
          },
        ]}>
        <Input
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Общий запас на лесосеке'
        name='TotalStock'
        rules={[
          {
            required: true,
            message: 'Введите общий запас на лесосеке!',
          },
        ]}>
        <InputNumber
          addonAfter='кбм'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Средний запас на лесосеке'
        name='AvgStock'
        rules={[
          {
            required: true,
            message: 'Введите средний запас на лесосеке!',
          },
        ]}>
        <InputNumber
          addonAfter='кбм/га'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Длина зоны вырубки'
        name='ZoneLength'
        rules={[
          {
            required: true,
            message: 'Введите длину зоны вырубки!',
          },
        ]}
        style={{ width: '100%' }}>
        <InputNumber
          addonAfter='м'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Число смен в один день на вывозке'
        name='ShiftsNumber'
        rules={[
          {
            required: true,
            message: 'Введите число смен!',
          },
        ]}
        style={{ width: '100%' }}>
        <InputNumber
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Сменная производительность машин на вывозке'
        name='replaceableMachinePerfomance'
        rules={[
          {
            required: true,
            message: 'Введите сменную производительность!',
          },
        ]}
        style={{ width: '100%' }}>
        <InputNumber
          addonAfter='кбм в смену'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Технологическая система'
        name='N'
        rules={[
          {
            required: true,
            message: 'Выберите технологическую систему!',
          },
        ]}
        style={{ width: '100%' }}>
        <Radio.Group>
          <Space direction='vertical'>
            {techSystem.slice(0, 4).map((val, i) => (
              <Radio key={i} value={i}>
                {val}
              </Radio>
            ))}
          </Space>
          <Space direction='vertical'>
            {techSystem.slice(4, 8).map((val) => (
              <Radio
                key={techSystem.indexOf(val)}
                value={techSystem.indexOf(val)}>
                {val}
              </Radio>
            ))}
          </Space>
          <Space direction='vertical'>
            {techSystem.slice(8, 12).map((val, i) => (
              <Radio
                key={techSystem.indexOf(val)}
                value={techSystem.indexOf(val)}>
                {val}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Button
            type='primary'
            disabled={!submittable || disabled}
            htmlType='submit'
            onClick={(e) => {
              submittable && dispatch(setIsVisible(true));
              window.scrollTo({
                top: 0,
                behavior: 'smooth', // плавная анимация скролла
              });
              // console.log(values);
            }}>
            Подтвердить
          </Button>
          <Button htmlType='reset' onClick={onReset} icon={<ClearOutlined />}>
            Очистить
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CommonForm;
