import { Col, Form, Input, InputNumber, Row, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { MonthInputData } from '../types/index-types';

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

interface MonthInputFormProps {
    index: number;
    monthName: string;
    onFinishInput: (index: number, data: MonthInputData) => void;
}

const MonthInputForm = ({
    index,
    monthName,
    onFinishInput,
}: MonthInputFormProps) => {
    const [form] = Form.useForm<MonthInputData>();
    const values = Form.useWatch([], form);
    const [month, setMonth] = useState<MonthInputData>();

    React.useEffect(() => {
        console.log(values);
        form.validateFields({ validateOnly: true }).then(
            () => {
                // setSubmittable(true);
                // ставить таблицу !disabled
                // console.log('Всё в ТАБЛИЦЕ введено, можно подтверждать');
                // console.log('Данные ТАБЛИЦЫ сохранены в redux');
            },
            () => {
                // setSubmittable(false);
                // ставить таблицу disabled
            }
        );
    }, [values]);

    const onFinish = (values: MonthInputData) => {
        console.log(values);
        onFinishInput(index, values);
        // form.resetFields();
    };
    return (
        <div>
            <Form
                form={form}
                onFinish={onFinish}
                // initialValues={DataCalculated}
                // autoComplete='off'
                // layout='horizontal'
            >
                <Row align='middle'>
                    <Col span={2} style={colStyle}>
                        <Title level={4}>{monthName}</Title>
                    </Col>
                    <Col span={2} style={colStyle}>
                        <Form.Item
                            name='TP'
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}>
                            <InputNumber
                                placeholder='Число рабочих дней'
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </Col>
                    {/*  */}
                    <Col span={2} style={{ padding: 10 }}>
                        <Typography.Text>Марка машины</Typography.Text>
                        {/* <div>
                                <Typography.Text>Марка машины</Typography.Text>
                            </div>

                            <div>
                                <Typography.Text>Марка машины</Typography.Text>
                            </div>
                            <div>
                                <Typography.Text>Марка машины</Typography.Text>
                            </div> */}
                    </Col>
                    <Col
                        span={2}
                        style={{
                            backgroundColor: '#c9afa2',
                        }}
                        offset={2}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input
                                name='MainMarkCars'
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input
                                name='MainMarkCars'
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input
                                name='MainMarkCars'
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </Col>

                    {/*  */}

                    {/* <Col span={2} style={colStyle}>
                        <Typography.Text strong>Марка машины</Typography.Text>
                    </Col>
                    <Col
                        span={2}
                        style={{
                            backgroundColor: '#c9afa2',
                        }}
                        offset={2}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input
                                name=''
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input
                                name=''
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input
                                name=''
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </Col> */}
                </Row>
            </Form>
        </div>
    );
};

export default MonthInputForm;
