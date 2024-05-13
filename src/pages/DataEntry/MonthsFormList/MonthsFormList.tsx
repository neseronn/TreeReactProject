import React, { useEffect, useState } from 'react';
import style from './MonthsFormList.module.scss';
import MonthDataItemList from './Components/MonthDataItemList';
import AffixCard from './Components/AffixCard';
import { Button, Input, Form, Typography, Card, Space, InputNumber, Popconfirm, FormInstance } from 'antd';
import Title from 'antd/es/typography/Title';
import { useTypedSelector } from '../../../store/hooks';
import { AllMonthInputData, ChangedAllMonthInputData } from '../../../types/index-types';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { changeArrLen, changeCommonData, changeDataMonthInfo, clearCarsData } from '../../../store/inputSlice';
import { CalculatorOutlined, ClearOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { setCalculated } from '../../../store/resultSlice';
import { techSystem, calcMonthNames } from '../../../common/index';

interface MonthsFormListProps {
  form: FormInstance<AllMonthInputData>;
  isVisible: boolean;
  onFinish: (values: AllMonthInputData) => void;
  onFinishFailed: (errorInfo: any) => void;
  loadBtn: boolean;
  disableForm: boolean;
  setDisableForm: (disableForm: boolean) => void;
}

const MonthsFormList: React.FC<MonthsFormListProps> = ({ form, isVisible, onFinish, onFinishFailed, loadBtn, disableForm, setDisableForm }) => {
  const { DataCalculated, DataMonthInfo } = useTypedSelector((store) => store.inputData.data);
  const isSuccess = useTypedSelector((store) => store.inputData.isSuccess);
  const { isCalculated } = useTypedSelector((store) => store.resultData);
  const dispatch = useDispatch<AppDispatch>();

  // Названия месяцев для карточек
  const [monthNames, setMonthNames] = useState<string[]>([]);
  // Массив букв тех. системы
  const [tech, setTech] = useState<string[]>([]);

  /** Данные 2-й формы */
  const values = Form.useWatch([], form);
  /** Предыдущая длина тех.системы */
  const [some, setSome] = useState<number>(0);

  useEffect(() => {
    form.resetFields();
    console.log('fields reset (bc tech.length changed)');
  }, [tech.length]);

  // Для заполнения второй формы после ввода вручную, а после выбора данных из истории (загрузки из истории), чтобы форма заполнилась
  useEffect(() => {
    form.setFieldsValue(DataMonthInfo);
  }, [isSuccess]);

  // При изменении кол-ва месяцев или первого месяца на 1-й форме меняем названия месяцев на 2-й форме
  useEffect(() => {
    setMonthNames(calcMonthNames(DataCalculated.FirstMonth, DataCalculated.CountMonth));
    // form.setFieldsValue(DataMonthInfo);
    console.log('DataCalculated.CountMonth: reset fields');
  }, [DataCalculated.CountMonth, DataCalculated.FirstMonth]);

  useEffect(() => {
    if (tech.length === 0) {
      setTech(techSystem[DataCalculated.N].split('+'));
    } else {
      if (!isSuccess) {
        dispatch(changeDataMonthInfo(values));
      }
    }
    // Ставим предыдущую длину
    setSome(tech.length);
    // Обновляем на текущую (текущий массив с новой длиной)
    setTech(techSystem[DataCalculated.N].split('+'));
    console.log('Увидели изменение N');
    console.log('some = ', some);
    console.log('isVisible', isVisible);
    console.log('tech', tech);
  }, [DataCalculated.N]);

  useEffect(() => {
    if (tech.length === 0) {
      setTech(techSystem[DataCalculated.N].split('+'));
    }

    console.log(disableForm);
  }, []);

  useEffect(() => {
    console.log('Выбранная система (в радио ):' + techSystem[DataCalculated.N].split('+').length);
    console.log('some (предыдущая длина массива букв): ' + some);
    console.log('tech.length', tech.length);

    // При загрузке данных если другая тех система и кол-во месяцев меньше
    // Убираются формы по лишним месяцам путём выреза массива до кол-ва месяцев в исходных данных
    form.setFieldValue('DATA', values?.DATA.splice(0, DataCalculated.CountMonth));

    if (some > techSystem[DataCalculated.N].split('+').length) {
      dispatch(
        changeArrLen({
          isIncrease: false,
          len: techSystem[DataCalculated.N].split('+').length,
        })
      );
    } else if (some < techSystem[DataCalculated.N].split('+').length) {
      dispatch(
        changeArrLen({
          isIncrease: true,
          len: techSystem[DataCalculated.N].split('+').length,
        })
      );
    }
  }, [tech.length]);

  // Ресет формы, чтобы пропали лишние из 4х поля / добавились новые
  useEffect(() => {
    form.resetFields();
  }, [DataMonthInfo.MainMarkCars?.length]);

  // Обработчик изменения значений в форме
  const handleFormValuesChange = (changedValues: ChangedAllMonthInputData, allValues: AllMonthInputData) => {
    isCalculated && dispatch(setCalculated(false));
  };

  // Функция очистки формы
  const onReset = () => {
    dispatch(clearCarsData());
  };

  return (
    <div className={disableForm ? style.Container + ' ' + style.disabled : style.Container}>
      <Form
        disabled={disableForm}
        onValuesChange={handleFormValuesChange}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        form={form}
        name='AllMonthInputData'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelWrap
        autoComplete='off'
        preserve={false}
        className={style.Container_form}>
        <div className={style.Container_form_header}>
          <Title level={3} className={style.Container_form_header_title}>
            Введите данные по машинам
          </Title>
          <Space size={'large'}>
            <Button htmlType='reset' onClick={onReset} icon={<ClearOutlined />}>
              Очистить
            </Button>
            <Button type='primary' icon={isCalculated ? '' : <CalculatorOutlined />} htmlType='submit' loading={loadBtn}>
              {isCalculated ? 'Перейти к расчетам' : 'Выполнить расчеты'}
            </Button>
          </Space>
        </div>

        <AffixCard tech={tech} />

        <Card size='small' style={{ overflow: 'hidden' }} className={style.card}>
          <Card.Grid hoverable={false} className={style.card_grid}>
            <Form.Item label='Марка машины' style={{ marginBottom: '0px' }}>
              <Form.List
                name='MainMarkCars'
                initialValue={DataMonthInfo.MainMarkCars ? DataMonthInfo.MainMarkCars : Array.from({ length: tech.length }, () => '')}>
                {(fields, { add, remove }) => (
                  <Space.Compact block>
                    {fields.map((field, i) => (
                      <Form.Item
                        style={{ flex: '1 0 20%', marginBottom: '0px' }}
                        key={field.key + i}
                        name={[field.name]}
                        rules={[
                          {
                            required: true,
                            message: '',
                          },
                        ]}>
                        <Input placeholder={`${tech[field.key]}`} />
                      </Form.Item>
                    ))}
                  </Space.Compact>
                )}
              </Form.List>
            </Form.Item>
          </Card.Grid>

          <Card.Grid hoverable={false} className={style.card_grid}>
            <Form.Item label='Марка машины' style={{ marginBottom: '0px' }}>
              <Form.List
                name='AdditionalMarkCars'
                initialValue={DataMonthInfo.AdditionalMarkCars ? DataMonthInfo.AdditionalMarkCars : Array(tech.length).fill('')}>
                {(fields, { add, remove }) => (
                  <Space.Compact block>
                    {fields.map((field, i) => (
                      <Form.Item
                        style={{ flex: '1 0 20%', marginBottom: '0px' }}
                        key={i}
                        preserve={false}
                        name={field.name}
                        rules={[
                          {
                            required: true,
                            message: '',
                          },
                        ]}>
                        <Input placeholder={`${tech[field.key]}`} />
                      </Form.Item>
                    ))}
                  </Space.Compact>
                )}
              </Form.List>
            </Form.Item>
          </Card.Grid>
        </Card>

        <Form.List name='DATA' initialValue={Array(DataCalculated.CountMonth).fill('')}>
          {(fields, { add, remove }) => (
            <div className={style.data}>
              {fields.map((field, i) => (
                <Card
                  key={field.key}
                  size='default'
                  style={{ overflow: 'hidden' }}
                  title={
                    <div className={style.cardinner}>
                      <Typography.Text strong style={{ textTransform: 'capitalize', letterSpacing: '1.3px' }}>
                        {monthNames[i]}
                      </Typography.Text>
                      <Form.Item
                        initialValue={DataMonthInfo.DATA[field.key]?.TP ? DataMonthInfo.DATA[field.key].TP : ''}
                        labelCol={{ flex: '0 0 14%' }}
                        wrapperCol={{ flex: '0 0 60%' }}
                        noStyle
                        name={[field.name, 'TP']}
                        style={{
                          flex: 'auto',
                          marginBottom: 0,
                          fontWeight: 400,
                        }}
                        rules={[
                          {
                            required: true,
                            message: '',
                          },
                        ]}>
                        <InputNumber addonAfter='рабочих дней' placeholder='число' min={1} max={31} width={20} />
                      </Form.Item>
                    </div>
                  }
                  extra={
                    fields.indexOf(field) === fields.length - 1 && fields.length > 1 ? (
                      <Popconfirm
                        title={<Typography.Title level={5}>Вы действительно хотите удалить месяц? Данные по нему также удалятся</Typography.Title>}
                        okText='Да'
                        cancelText='Отмена'
                        placement='left'
                        icon={<QuestionCircleOutlined style={{ color: 'red', fontSize: '20px' }} />}
                        okButtonProps={{ danger: true, size: 'large' }}
                        cancelButtonProps={{ size: 'large' }}
                        onConfirm={() => {
                          remove(field.name);
                          dispatch(
                            changeCommonData({
                              CountMonth: DataCalculated.CountMonth - 1,
                            })
                          );
                        }}>
                        <CloseOutlined />
                      </Popconfirm>
                    ) : null
                  }>
                  <Card.Grid hoverable={false} className={`${style.grid} ${style.order0}`}>
                    <MonthDataItemList
                      label='Число машин'
                      fieldName='MainCountCars'
                      field={field}
                      initialValue={DataMonthInfo.DATA[field.key] ? DataMonthInfo.DATA[field.key].MainCountCars : Array(tech.length).fill(null)}
                      tech={tech}
                    />
                  </Card.Grid>

                  <Card.Grid hoverable={false} className={`${style.grid} ${style.order3}`}>
                    <MonthDataItemList
                      label='Число машин'
                      fieldName='AdditionalCountCars'
                      field={field}
                      initialValue={DataMonthInfo.DATA[field.key] ? DataMonthInfo.DATA[field.key].AdditionalCountCars : Array(tech.length).fill(null)}
                      tech={tech}
                    />
                  </Card.Grid>

                  <Card.Grid hoverable={false} className={`${style.grid} ${style.order1}`}>
                    <MonthDataItemList
                      label='Число смен'
                      fieldName='MainCountShift'
                      field={field}
                      initialValue={DataMonthInfo.DATA[field.key] ? DataMonthInfo.DATA[field.key].MainCountShift : Array(tech.length).fill(null)}
                      tech={tech}
                    />
                  </Card.Grid>

                  <Card.Grid hoverable={false} className={`${style.grid} ${style.order4}`}>
                    <MonthDataItemList
                      label='Число смен'
                      fieldName='AdditionalCountShift'
                      field={field}
                      initialValue={
                        DataMonthInfo.DATA[field.key] ? DataMonthInfo.DATA[field.key].AdditionalCountShift : Array(tech.length).fill(null)
                      }
                      tech={tech}
                    />
                  </Card.Grid>

                  <Card.Grid hoverable={false} className={`${style.grid} ${style.order2}`}>
                    <MonthDataItemList
                      label='Сменная выработка'
                      fieldName='MainShiftProduction'
                      field={field}
                      initialValue={DataMonthInfo.DATA[field.key] ? DataMonthInfo.DATA[field.key].MainShiftProduction : Array(tech.length).fill(null)}
                      tech={tech}
                    />
                  </Card.Grid>

                  <Card.Grid hoverable={false} className={`${style.grid} ${style.order5}`}>
                    <MonthDataItemList
                      label='Сменная выработка'
                      fieldName='AdditionalShiftProduction'
                      field={field}
                      initialValue={
                        DataMonthInfo.DATA[field.key] ? DataMonthInfo.DATA[field.key].AdditionalShiftProduction : Array(tech.length).fill(null)
                      }
                      tech={tech}
                    />
                  </Card.Grid>
                </Card>
              ))}

              <Button
                type='dashed'
                onClick={() => {
                  add();
                  dispatch(
                    changeCommonData({
                      CountMonth: DataCalculated.CountMonth + 1,
                    })
                  );
                }}
                block>
                Добавить месяц
              </Button>
            </div>
          )}
        </Form.List>

        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default MonthsFormList;
