import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Space, FormInstance } from 'antd';
import { ChangedCommonInputData, CommonInputData } from '../../../types/index-types';
import { changeCommonData, clearAllData, setIsChanged } from '../../../store/inputSlice';
import { useTypedSelector } from '../../../store/hooks';
import { Typography } from 'antd';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { techSystem } from '../../../common/index';
import { setCalculated } from '../../../store/resultSlice';
import { ClearOutlined } from '@ant-design/icons';
import style from './CommonForm.module.scss';
import _ from 'lodash';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
const { Title } = Typography;

interface CommonFormProps {
  form: FormInstance<CommonInputData>;
  isVisible: boolean;
  setIsVisible: ActionCreatorWithPayload<boolean, 'inputData/setIsVisible'>;
  setDisableForm: (disableForm: boolean) => void;
}

const CommonForm: React.FC<CommonFormProps> = ({ form, isVisible, setIsVisible, setDisableForm }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { DataCalculated, DataAboutRecord } = useTypedSelector((store) => store.inputData.data);
  const isSuccess = useTypedSelector((store) => store.inputData.isSuccess);
  const isChanged = useTypedSelector((store) => store.inputData.isChanged);
  const isCalculated = useTypedSelector((store) => store.resultData.isCalculated);

  const values = Form.useWatch([], form);
  // submittable - активна ли кнопка отправки формы
  const [submittable, setSubmittable] = useState(false);
  // disabled - активно ли поле CountMonth (Количество месяцев)
  const [disabled, setDisabled] = useState(isCalculated || false);
  // Данные, загруженные из истории, для проверки их изменения
  const [savedValues, setSavedValues] = useState<null | CommonInputData>(null);

  // Обработчик изменения значений в форме
  const handleFormValuesChange = (changedValues: ChangedCommonInputData, allValues: CommonInputData) => {
    // Если данные загружены из истории
    if (isSuccess) {
      // console.log();
      console.log(_.isEqual(allValues, savedValues));
      // Если данные изменились, то меняем плашку вверху на желтую
      if (!_.isEqual(allValues, savedValues)) {
        console.log('savedValues', savedValues);
        console.log('allValues', allValues);
        dispatch(setIsChanged(true));
        // setSubmittable(true);
      }
      // Иначе возвращаем ее на неизменную
      else if (isChanged && _.isEqual(allValues, savedValues)) {
        console.log('isChanged', isChanged);
        console.log('_.isEqual(allValues, savedValues)', _.isEqual(allValues, savedValues));
        console.log('savedValues', savedValues);
        console.log('allValues', allValues);
        dispatch(setIsChanged(false));
        // setSubmittable(false);
        // setDisableForm(false);
      }
    }

    // if (isVisible && changedValues && !_.isEqual(allValues, savedValues)) {
    // Если видима вторая форма и есть измененные данные на первой,
    // то блокируем вторую форму чтобы применить изменения на первой
    if (isVisible && changedValues && !_.isEqual(allValues, DataCalculated)) {
      console.log('changedValues', changedValues);
      console.log('DataCalculated', DataCalculated);
      console.log('allValues', allValues);
      setDisableForm(true);
      setSubmittable(true);
      // СДЕЛАТЬ ТУТ УВЕДОМЛЕНИЕ ЧТО ДАННЫЕ ИЗМЕНЕНЫ, ПОДТВЕРДИТЕ ИХ !!!
    } else if (isVisible) {
      setDisableForm(false);
      setSubmittable(false);
    }

    // console.log('changedValues', changedValues)
    // dispatch(changeCommonData(changedValues));

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
  };

  // Для обновления количества месяцев при добавлении/удалении карточки месяца
  useEffect(() => {
    form.setFieldValue('CountMonth', DataCalculated?.CountMonth);
  }, [DataCalculated?.CountMonth]);

  // Валидация, открытие второй формы
  useEffect(() => {
    console.log(values);
    // disable/undisable кнопки 1-й формы
    form.validateFields({ validateOnly: true }).then(
      () => {
        !isSuccess && setSubmittable(true);
        console.log('Всё введено, можно подтверждать');
        // console.log('Данные сохранены в redux');
      },
      () => {
        setSubmittable(false);
        console.log('не все заполнено');
      }
    );
  }, [values]);

  useEffect(() => {
    console.log('Данные при первом рендере:');
    console.log(values);
  }, []);

  useEffect(() => {
    // Когда даные загружены из истории
    if (isSuccess) {
      setSubmittable(false);
      setSavedValues(DataCalculated);
      setDisabled(true);
      form.setFieldsValue(DataCalculated);
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log('submittable = ', submittable);
  }, [submittable]);

  const onFinish = (values: CommonInputData) => {
    // setDisabled(true);
    console.log('onFinish', values);
    submittable && dispatch(changeCommonData(values));
    !isVisible && !!submittable && dispatch(setIsVisible(true));
    setDisableForm(false);
    console.log('onFinish: сохранены в redux');
    setSubmittable(false);
    // dispatch(addTechSystem(values));
    // form.resetFields();
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // плавная анимация скролла
    });
  };

  const onReset = () => {
    dispatch(clearAllData());
    setDisabled(false);
  };

  return (
    <div className={style.commonForm_container}>
      <Form
        variant='filled'
        form={form}
        onFinish={onFinish}
        initialValues={DataCalculated} //при возврате с рассчетов чтоб заполнялось
        onValuesChange={handleFormValuesChange}
        autoComplete='off'
        layout={isVisible ? 'vertical' : 'horizontal'}
        className={style.form}>
        <Title level={4} style={{ textAlign: 'center' }}>
          Введите общие данные
        </Title>

        <Form.Item
          label='Предприятие'
          name='Company'
          rules={[
            {
              required: true,
              message: 'Заполните предприятие!',
            },
          ]}>
          <Input
            placeholder='Предприятие'
            value={DataCalculated?.Company}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          label='Лесосека, номер квартала'
          name='CuttingArea'
          rules={[
            {
              required: true,
              message: 'Заполните лесосеку и номер квартала!',
            },
          ]}>
          <Input
            placeholder='Лесосека, номер квартала'
            value={DataCalculated?.CuttingArea}
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
            placeholder='Количество месяцев'
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
            placeholder='Первый месяц'
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
            placeholder='Марка'
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
            placeholder='Общий запас на лесосеке'
            min={0}
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
            placeholder='Средний запас на лесосеке'
            min={0}
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
            placeholder='Длина зоны вырубки'
            addonAfter='м'
            min={0}
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
            placeholder='Число смен'
            min={0}
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
            placeholder='Сменная производительность машин на вывозке'
            addonAfter='кбм в смену'
            min={0}
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
                <Radio key={techSystem.indexOf(val)} value={techSystem.indexOf(val)}>
                  {val}
                </Radio>
              ))}
            </Space>
            <Space direction='vertical'>
              {techSystem.slice(8, 12).map((val, i) => (
                <Radio key={techSystem.indexOf(val)} value={techSystem.indexOf(val)}>
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
              disabled={
                !submittable
                // || disabled
              }
              htmlType='submit'
              onClick={(e) => {
                // submittable && dispatch(setIsVisible(true));
                console.log('clicked');
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
    </div>
  );
};

export default CommonForm;
