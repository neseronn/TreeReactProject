import { useState } from 'react';
import { Button, Form, Input, InputNumber, Space } from 'antd';

const CommonForm = ({ setIsVisible, isVisible }: any) => {
    // const [firstMonth, setFirstMonth] = useState<any | null>(null);
    const [form] = Form.useForm<CommonData>();
    const values = Form.useWatch([], form);

    return (
        <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout='vertical'
            style={{
                minWidth: 360,
                padding: 20,
                backgroundColor: 'white',
                margin: '0 auto',
            }}>
            <Form.Item
                label='Количество месяцев'
                name='monthsCount'
                rules={[
                    {
                        required: true,
                        message: 'Введите количество месяцев!',
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
                label='Первый месяц'
                name='firstMonth'
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
                name='mark'
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
                name='mark'
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
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}>
                <Space>
                    <Button
                        type='primary'
                        htmlType='submit'
                        onClick={(e) => {
                            // e.preventDefault();
                            // setIsVisible(!isVisible);
                            console.log(values);
                        }}>
                        Submit
                    </Button>
                    <Button htmlType='reset'>Очистить</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default CommonForm;
