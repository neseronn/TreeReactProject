import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  Input,
  Form,
  Row,
  Col,
  Typography,
  Card,
  Space,
  Affix,
  InputNumber,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useTypedSelector } from '../store/hooks';
import {
  AllMonthInputData,
  ChangedAllMonthInputData,
  ChangedCommonInputData,
  CommonInputData,
  MonthInputData,
} from '../types/index-types';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import {
  changeArrLen,
  changeCommonData,
  changeDataMonthInfo,
  removeLastMonthData,
  // setDATA,
  // setMonthData,
} from '../store/inputSlice';
import { CloseOutlined } from '@ant-design/icons';

const techSystem = [
  'В+Т+С+П',
  'В+С+Т+П',
  'В+С+Т+П',
  'В+Т+С+П',
  'В+Т+С',
  'В+Т+П',
  'ВСР+Т+П',
  'В+Т',
  'ВСР+Т',
  'ВТ+СР+П',
  'ВТ+СР',
  'ВТ+П',
];

const gridStyleHead: React.CSSProperties = {
  width: '20%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: 30,
  padding: 0,
};

const gridStyleTop: React.CSSProperties = {
  width: '20%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: 40,
  padding: 0,
};

const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const CardCol = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const calcMonthNames = (firstMonth: number, countMonth: number): string[] => {
  const monthNames = [];
  for (let i = firstMonth; i < Number(countMonth) + Number(firstMonth); i++) {
    // Получение названия месяца на русском языке
    let monthName = new Date(2023, i - 1, 1).toLocaleString('ru', {
      month: 'long',
    });
    monthNames.push(monthName);
  }
  return monthNames;
};

const MonthsFormList = () => {
  // const { tech } = useTypedSelector((store) => store.inputData);
  const { DataCalculated, DataMonthInfo } = useTypedSelector(
    (store) => store.inputData.data
  );
  const dispatch = useDispatch<AppDispatch>();
  // const handleChangeMonthData = (index: number, data: MonthInputData) => {
  //   dispatch(setMonthData({ index, data }));
  // };

  // Названия месяцов для карточек
  const [monthNames, setMonthNames] = useState<string[]>([]);
  const [tech, setTech] = useState<string[]>([]);

  const [form] = Form.useForm<AllMonthInputData>();
  const values = Form.useWatch([], form);
  const [some, setSome] = useState<number>(0);
  // const [submittable, setSubmittable] = useState(true);

  // useEffect(() => {
  //   console.log(values);
  //   form.validateFields({ validateOnly: true }).then(
  //     () => {
  //       setSubmittable(true);
  //       console.log('Всё в ТАБЛИЦЕ введено, можно подтверждать');
  //       console.log('Данные ТАБЛИЦЫ сохранены в redux');
  //     },
  //     () => {
  //       setSubmittable(false);
  //     }
  //   );
  // }, [values]);
  const navigate = useNavigate();
  const onFinish = (values: AllMonthInputData) => {
    console.log('FINISH');
    navigate('/results');
  };

  useEffect(() => {
    form.resetFields();

    console.log('fields reset (bc tech.length changed)');
  }, [tech.length]);

  useEffect(() => {
    setMonthNames(
      calcMonthNames(DataCalculated.FirstMonth, DataCalculated.CountMonth)
    );
    // form.resetFields();

    console.log('DataCalculated.CountMonth: reset fields');
  }, [DataCalculated.CountMonth, DataCalculated.FirstMonth]);

  // useEffect(() => {
  //   if (DataCalculated.CountMonth > values?.DATA.length) {
  //     console.log('DataCalculated.CountMonth: delete last in redux');
  //     // dispatch(removeLastMonthData());
  //   }
  // }, [DataCalculated.CountMonth]);

  useEffect(() => {
    if (tech.length == 0) {
      setTech(techSystem[DataCalculated.N].split('+'));
    }
    // Ставим предыдущую длину
    setSome(tech.length);
    // Обновляем на текущую (текущий массив с новой длиной)
    setTech(techSystem[DataCalculated.N].split('+'));
    console.log('Я увидел изменение N');
    console.log(some);

    // form.resetFields();
  }, [DataCalculated.N]);

  useEffect(() => {
    console.log(
      'Выбранная система (в радио ):' +
        techSystem[DataCalculated.N].split('+').length
    );
    console.log('some (предыдущая длина массива букв): ' + some);

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
    // form.resetFields();
  }, [tech.length]);

  useEffect(() => {
    form.resetFields();
  }, [DataMonthInfo.MainMarkCars.length]);

  // Обработчик изменения значений в форме
  const handleFormValuesChange = (
    changedValues: ChangedAllMonthInputData,
    allValues: AllMonthInputData
  ) => {
    dispatch(changeDataMonthInfo(allValues));
    console.log('changedValues:');
    console.log(changedValues);
    console.log('allValues:');
    console.log(allValues);

    console.log('handleFormValuesChange: сохранены в redux');
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: 100,
        display: 'flex',
        rowGap: 16,
        flexDirection: 'column',
        overflow: 'hidden',
        padding: 20,
        backgroundColor: 'white',
        margin: '0 auto',
        borderRadius: 6,
      }}>
      <Form
        onValuesChange={handleFormValuesChange}
        labelCol={
          tech.length === 4
            ? { flex: '1 0 20%' }
            : tech.length === 3
            ? { flex: '1 0 25%' }
            : { flex: '1 0 calc(100% / 3)' }
        }
        wrapperCol={
          tech.length === 4
            ? { flex: '1 0 80%' }
            : tech.length === 3
            ? { flex: '1 0 75%' }
            : { flex: '1 0 calc(200% / 3)' }
        }
        form={form}
        name='AllMonthInputData'
        onFinish={onFinish}
        labelWrap
        autoComplete='off'
        // initialValues={
        //   DataMonthInfo?.DATA?.length > 0
        //     ? DataMonthInfo
        //     : {
        //         // MainMarkCars: [],
        //         // AdditionalMarkCars: [],
        //         DATA:
        //           // Array.from({ length: DataCalculated.CountMonth }, () => null)
        //           Array(DataCalculated.CountMonth).fill(null),
        //         // Array(DataCalculated.CountMonth).fill(null),
        //       }
        // }
        style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // columnGap: '15rem',
            // backgroundColor: '#f2f2f2',
          }}>
          <Title level={3} style={{ textAlign: 'center' }}>
            Введите данные по машинам
          </Title>
          <Button type='primary' htmlType='submit'>
            Рассчитать
          </Button>
          {/* </Link> */}
        </div>

        <Affix offsetTop={16}>
          <Card
            size='small'
            style={{
              overflow: 'hidden',
              padding: 0,
              backgroundColor: '#fafafa',
              boxSizing: 'border-box',
            }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <Card.Grid
                hoverable={false}
                style={{
                  ...gridStyleTop,
                  flexBasis: '50%',
                }}>
                <Typography.Text strong>Основные</Typography.Text>
              </Card.Grid>

              <Card.Grid
                hoverable={false}
                style={{
                  ...gridStyleTop,
                  flexBasis: '50%',
                }}>
                <Typography.Text strong>Дополнительные</Typography.Text>
              </Card.Grid>
            </div>

            <Card.Grid
              hoverable={false}
              style={{
                ...gridStyleTop,
                flexBasis: '10%',
                flexGrow: 1,
              }}>
              <Typography.Text strong>Параметры</Typography.Text>
            </Card.Grid>
            {tech.map((car, index) => (
              <Card.Grid
                key={index}
                hoverable={false}
                style={{
                  ...gridStyleTop,
                  flexBasis: '10%',
                  flexGrow: 1,
                }}>
                <Typography.Text strong>{car}</Typography.Text>
              </Card.Grid>
            ))}

            <Card.Grid
              hoverable={false}
              style={{ ...gridStyleTop, flexBasis: '10%', flexGrow: 1 }}>
              <Typography.Text strong>Параметры</Typography.Text>
            </Card.Grid>
            {tech.map((car, index) => (
              <Card.Grid
                key={index}
                hoverable={false}
                style={{
                  ...gridStyleTop,
                  flexBasis: '10%',
                  flexGrow: 1,
                }}>
                <Typography.Text strong>{car}</Typography.Text>
              </Card.Grid>
            ))}
          </Card>
        </Affix>

        <Card size='small' style={{ padding: '0', overflow: 'hidden' }}>
          <Card.Grid
            hoverable={false}
            style={{
              width: '50%',
              padding: '20px 0px',
              boxShadow: 'none',
            }}>
            <Form.Item label='Марка машины' style={{ marginBottom: '0px' }}>
              {/* Массив MainMarkCars */}
              <Form.List
                name='MainMarkCars'
                initialValue={
                  DataMonthInfo.MainMarkCars
                    ? DataMonthInfo.MainMarkCars
                    : Array.from({ length: tech.length }, () => '')
                }>
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

          <Card.Grid
            hoverable={false}
            style={{
              width: '50%',
              padding: '20px 0px',
              boxShadow: 'none',
            }}>
            <Form.Item label='Марка машины' style={{ marginBottom: '0px' }}>
              <Form.List
                name='AdditionalMarkCars'
                initialValue={
                  DataMonthInfo.AdditionalMarkCars
                    ? DataMonthInfo.AdditionalMarkCars
                    : Array(tech.length).fill('')
                }>
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

        <Form.List
          name='DATA'
          initialValue={
            // DataMonthInfo.DATA
            //   ? DataMonthInfo.DATA
            //   :
            Array(DataCalculated.CountMonth).fill(null)
          }
          // initialValue={Array(monthNames.length).fill(null)}
        >
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field, i) => (
                <Card
                  key={field.key}
                  size='default'
                  style={{ overflow: 'hidden' }}
                  title={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        width: '100%',
                      }}>
                      <Typography.Text
                        strong
                        style={{ textTransform: 'capitalize' }}>
                        {monthNames[i]}, {field.key}
                      </Typography.Text>
                      <Form.Item
                        initialValue={
                          DataMonthInfo.DATA[field.key]?.TP
                            ? DataMonthInfo.DATA[field.key].TP
                            : ''
                        }
                        labelCol={{ flex: '0 0 14%' }}
                        wrapperCol={{ flex: '0 0 60%' }}
                        label='число рабочих дней'
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
                        <InputNumber min={1} max={31} />
                      </Form.Item>
                    </div>
                  }
                  extra={
                    fields.indexOf(field) === fields.length - 1 &&
                    fields.length > 1 ? (
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                          dispatch(
                            changeCommonData({
                              CountMonth: DataCalculated.CountMonth - 1,
                            })
                          );
                        }}
                      />
                    ) : null
                  }>
                  <Card.Grid
                    hoverable={false}
                    style={{
                      width: '50%',
                      padding: '20px 0',
                      boxShadow: 'none',
                    }}>
                    <Form.Item label='Число машин' style={{ marginBottom: 0 }}>
                      <Form.List
                        name={[field.name, 'MainCountCars']}
                        initialValue={
                          DataMonthInfo.DATA[field.key]
                            ? DataMonthInfo.DATA[field.key].MainCountCars
                            : Array(tech.length).fill(null)
                        }>
                        {(subfields, subOps) => (
                          <Space.Compact block>
                            {subfields.map((subfield) => (
                              <Form.Item
                                style={{
                                  flex: '1 0 20%',
                                  marginBottom: 0,
                                }}
                                preserve={false}
                                key={subfield.key}
                                name={subfield.name}
                                rules={[
                                  {
                                    required: true,
                                    message: '',
                                  },
                                ]}>
                                <InputNumber
                                  style={{ width: '100%' }}
                                  placeholder={`${tech[subfield.key]}`}
                                />
                              </Form.Item>
                            ))}
                          </Space.Compact>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card.Grid>

                  <Card.Grid
                    hoverable={false}
                    style={{
                      width: '50%',
                      padding: '20px 0px',
                      boxShadow: 'none',
                    }}>
                    <Form.Item label='Число машин' style={{ marginBottom: 0 }}>
                      <Form.List
                        name={[field.name, 'AdditionalCountCars']}
                        initialValue={
                          DataMonthInfo.DATA[field.key]
                            ? DataMonthInfo.DATA[field.key].AdditionalCountCars
                            : Array(tech.length).fill(null)
                        }
                        // initialValue={Array(tech.length).fill(null)}
                      >
                        {(subfields, subOps) => (
                          <Space.Compact block style={flexCenter}>
                            {subfields.map((subfield) => (
                              <Form.Item
                                style={{
                                  flex: '1 0 20%',
                                  marginBottom: 0,
                                }}
                                preserve={false}
                                key={subfield.key}
                                name={subfield.name}
                                rules={[
                                  {
                                    required: true,
                                    message: '',
                                  },
                                ]}>
                                <InputNumber
                                  style={{ width: '100%' }}
                                  placeholder={`${tech[subfield.key]}`}
                                />
                              </Form.Item>
                            ))}
                          </Space.Compact>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card.Grid>

                  <Card.Grid
                    hoverable={false}
                    style={{
                      width: '50%',
                      padding: '20px 0px',
                      boxShadow: 'none',
                    }}>
                    <Form.Item label='Число смен' style={{ marginBottom: 0 }}>
                      <Form.List
                        name={[field.name, 'MainCountShift']}
                        initialValue={
                          DataMonthInfo.DATA[field.key]
                            ? DataMonthInfo.DATA[field.key].MainCountShift
                            : Array(tech.length).fill(null)
                        }
                        // initialValue={Array(tech.length).fill(null)}
                      >
                        {(subfields, subOps) => (
                          <Space.Compact block style={flexCenter}>
                            {subfields.map(
                              // ({ key, name, fieldKey, ...restField }) => (
                              (subfield) => (
                                <Form.Item
                                  style={{
                                    flex: '1 0 20%',
                                    marginBottom: 0,
                                  }}
                                  preserve={false}
                                  key={subfield.key}
                                  // label={`${tech[subfield.key]}`}
                                  // {...subfield.restField}
                                  name={subfield.name}
                                  rules={[
                                    {
                                      required: true,
                                      message: '',
                                    },
                                  ]}>
                                  <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={`${tech[subfield.key]}`}
                                  />
                                </Form.Item>
                              )
                            )}
                          </Space.Compact>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card.Grid>

                  <Card.Grid
                    hoverable={false}
                    style={{
                      width: '50%',
                      padding: '20px 0px',
                      boxShadow: 'none',
                    }}>
                    <Form.Item label='Число смен' style={{ marginBottom: 0 }}>
                      <Form.List
                        name={[field.name, 'AdditionalCountShift']}
                        initialValue={
                          DataMonthInfo.DATA[field.key]
                            ? DataMonthInfo.DATA[field.key].AdditionalCountShift
                            : Array(tech.length).fill(null)
                        }
                        // initialValue={Array(tech.length).fill(null)}
                      >
                        {(subfields, subOps) => (
                          <Space.Compact block>
                            {subfields.map(
                              // ({ key, name, fieldKey, ...restField }) => (
                              (subfield) => (
                                <Form.Item
                                  style={{
                                    flex: '1 0 20%',
                                    marginBottom: 0,
                                  }}
                                  preserve={false}
                                  key={subfield.key}
                                  // label={`${tech[subfield.key]}`}
                                  // {...subfield.restField}
                                  name={subfield.name}
                                  rules={[
                                    {
                                      required: true,
                                      message: '',
                                    },
                                  ]}>
                                  <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={`${tech[subfield.key]}`}
                                  />
                                </Form.Item>
                              )
                            )}
                          </Space.Compact>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card.Grid>

                  <Card.Grid
                    hoverable={false}
                    style={{
                      width: '50%',
                      padding: '20px 5px',
                      boxShadow: 'none',
                    }}>
                    <Form.Item
                      label='Сменная выработка'
                      style={{ marginBottom: 0 }}>
                      <Form.List
                        name={[field.name, 'MainShiftProduction']}
                        initialValue={
                          DataMonthInfo.DATA[field.key]
                            ? DataMonthInfo.DATA[field.key].MainShiftProduction
                            : Array(tech.length).fill(null)
                        }
                        // initialValue={Array(tech.length).fill(null)}
                      >
                        {(subfields, subOps) => (
                          <Space.Compact block style={flexCenter}>
                            {subfields.map(
                              // ({ key, name, fieldKey, ...restField }) => (
                              (subfield) => (
                                <Form.Item
                                  style={{ flex: '1 0 20%', marginBottom: 0 }}
                                  preserve={false}
                                  key={subfield.key}
                                  // label={`${tech[subfield.key]}`}
                                  // {...subfield.restField}
                                  name={subfield.name}
                                  rules={[
                                    {
                                      required: true,
                                      message: '',
                                    },
                                  ]}>
                                  <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={`${tech[subfield.key]}`}
                                  />
                                </Form.Item>
                              )
                            )}
                          </Space.Compact>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card.Grid>

                  <Card.Grid
                    hoverable={false}
                    style={{
                      width: '50%',
                      padding: '20px 5px',
                      boxShadow: 'none',
                    }}>
                    <Form.Item
                      label='Сменная выработка'
                      style={{ marginBottom: 0 }}>
                      <Form.List
                        name={[field.name, 'AdditionalShiftProduction']}
                        initialValue={
                          DataMonthInfo.DATA[field.key]
                            ? DataMonthInfo.DATA[field.key]
                                .AdditionalShiftProduction
                            : Array(tech.length).fill(null)
                        }
                        // initialValue={Array(tech.length).fill(null)}
                      >
                        {(subfields, subOps) => (
                          <Space.Compact block style={flexCenter}>
                            {subfields.map(
                              // ({ key, name, fieldKey, ...restField }) => (
                              (subfield) => (
                                <Form.Item
                                  style={{ flex: '1 0 20%', marginBottom: 0 }}
                                  preserve={false}
                                  key={subfield.key}
                                  // label={`${tech[subfield.key]}`}
                                  // {...subfield.restField}
                                  name={subfield.name}
                                  rules={[
                                    {
                                      required: true,
                                      message: '',
                                    },
                                  ]}>
                                  <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={`${tech[subfield.key]}`}
                                  />
                                </Form.Item>
                              )
                            )}
                          </Space.Compact>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card.Grid>
                </Card>
              ))}

              <Button
                type='dashed'
                onClick={() => {
                  add();
                  // form.resetFields();
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

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>

      {/* <Button
                    htmlType='submit'
                    // onSubmit={}
                >
                    Готово
                </Button> */}
    </div>
  );
};

export default MonthsFormList;
