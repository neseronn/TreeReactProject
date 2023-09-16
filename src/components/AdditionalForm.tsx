import { Button, Table, Input, Form, Row, Col, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../store/hooks';
import { AllMonthInputData, MonthInputData } from '../types/index-types';
import MonthInputForm from './MonthInputForm';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
// import { setMonthData } from '../store/inputSlice';

// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//         fixed: 'center',
//         children: [
//             {
//                 title: 'Age',
//                 dataIndex: 'age',
//                 key: 'age',
//             },
//         ],
//     },
// ];

const getMonthNames = (firstMonth: number, countMonth: number): string[] => {
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

const colStyle: React.CSSProperties = {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#c0c3b2',
    border: '1px solid #1e0908',

    padding: 10,
};

const paramStyle: React.CSSProperties = {
    ...colStyle,
    // justifyContent: 'center',
    // columnGap: 40,
};

const AdditionalForm = () => {
    const { DataCalculated, DataMonthInfo } = useTypedSelector(
        (store) => store.inputData.data
    );
    const dispatch = useDispatch<AppDispatch>();
    const handleChangeMonthData = (index: number, data: MonthInputData) => {
        // dispatch(setMonthData({ index, data }));
    };

    const [monthNames, setMonthNames] = useState<string[]>([]);

    const [form] = Form.useForm<AllMonthInputData>();
    const values = Form.useWatch([], form);
    const [submittable, setSubmittable] = useState(true);

    useEffect(() => {
        console.log(values);
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
                // ставить таблицу !disabled
                console.log('Всё в ТАБЛИЦЕ введено, можно подтверждать');
                console.log('Данные ТАБЛИЦЫ сохранены в redux');
            },
            () => {
                setSubmittable(false);
                // ставить таблицу disabled
            }
        );
    }, [values]);

    const onFinish = (values: AllMonthInputData) => {
        console.log(values);
        // dispatch(addTechSystem(values));
        // form.resetFields();
    };

    useEffect(() => {
        setMonthNames(
            getMonthNames(DataCalculated.FirstMonth, DataCalculated.CountMonth)
        );
        // console.log(monthNames);
    }, [DataCalculated.CountMonth, DataCalculated.FirstMonth]);

    //str.split('+');

    return (
        <div
            style={{
                width: '100%',
                minHeight: 100,
                overflow: 'hidden',
                padding: 20,
                backgroundColor: 'white',
                margin: '0 auto',
                borderRadius: 6,
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                    // columnGap: '15rem',
                    backgroundColor: '#f2f2f2',
                }}>
                <Title level={4} style={{ textAlign: 'center' }}>
                    Введите данные по машинам
                </Title>
                {/* Поменять на submit button, onsubmit - запрос на вычисления и переход на след страницу */}
                <Link to={'/results'}>
                    <Button>Рассчитать</Button>
                </Link>
            </div>

            <div
                style={{
                    backgroundColor: '#f2f2f2',
                }}>
                <Row>
                    <Col span={10} offset={4} style={colStyle}>
                        <Title level={4}>Основные</Title>
                    </Col>
                    <Col span={10} style={colStyle}>
                        <Title level={4}>Дополнительные</Title>
                    </Col>
                </Row>

                {/* Header */}
                <Row>
                    <Col span={2} style={colStyle}>
                        <Typography.Text strong>Месяц</Typography.Text>
                    </Col>
                    <Col span={2} style={colStyle}>
                        <Typography.Text strong>
                            Число рабочих дней
                        </Typography.Text>
                    </Col>
                    <Col span={2} style={colStyle}>
                        <Typography.Text strong>Параметры</Typography.Text>
                    </Col>
                    <Col
                        span={2}
                        style={{
                            backgroundColor: '#c9afa2',
                        }}
                        offset={2}>
                        <Typography.Text strong>В</Typography.Text>
                    </Col>
                    <Col span={2}>
                        <Typography.Text strong>В</Typography.Text>
                    </Col>
                    <Col span={2}>
                        <Typography.Text strong>В</Typography.Text>
                    </Col>
                    <Col span={2} style={colStyle}>
                        <Typography.Text strong>Параметры</Typography.Text>
                    </Col>
                    <Col
                        span={2}
                        style={{
                            backgroundColor: '#c9afa2',
                        }}
                        offset={2}>
                        <Typography.Text strong>В</Typography.Text>
                    </Col>
                    <Col span={2}>
                        <Typography.Text strong>В</Typography.Text>
                    </Col>
                    <Col span={2}>
                        <Typography.Text strong>В</Typography.Text>
                    </Col>
                </Row>

                {/* Строки с полями ввода */}
                {/* <Form
                    form={form}
                    onFinish={onFinish}
                    // initialValues={DataCalculated}
                    // autoComplete='off'
                    layout='horizontal'
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 6,
                    }}> */}
                {/* <div key={-1}> */}
                <div>
                    <Row>
                        <Col span={2} offset={4} style={colStyle}>
                            <Typography.Text strong>
                                Марка машины
                            </Typography.Text>
                        </Col>
                        <Col
                            span={2}
                            style={{
                                backgroundColor: '#c9afa2',
                            }}
                            offset={2}>
                            <Form.Item
                                name='MainMarkCars'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Typography.Text strong>В</Typography.Text>
                        </Col>
                        <Col span={2}>
                            <Typography.Text strong>В</Typography.Text>
                        </Col>
                        <Col span={2} style={colStyle}>
                            <Typography.Text strong>
                                Марка машины
                            </Typography.Text>
                        </Col>
                        <Col
                            span={2}
                            style={{
                                backgroundColor: '#c9afa2',
                            }}
                            offset={2}>
                            <Typography.Text strong>В</Typography.Text>
                        </Col>
                        <Col span={2}>
                            <Typography.Text strong>В</Typography.Text>
                        </Col>
                        <Col span={2}>
                            <Typography.Text strong>В</Typography.Text>
                        </Col>
                    </Row>
                </div>

                {/* </div> */}
                {monthNames.map((monthName, index) => (
                    <MonthInputForm
                        key={index}
                        index={index}
                        monthName={monthName}
                        onFinishInput={handleChangeMonthData}
                    />
                ))}
                <Button
                    htmlType='submit'
                    // onSubmit={}
                >
                    Готово
                </Button>
                {/* </Form> */}
            </div>
        </div>
    );
};

export default AdditionalForm;
