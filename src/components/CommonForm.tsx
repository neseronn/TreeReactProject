import { useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Space } from 'antd';
import {
    CommonData,
    TECH_SYSTEM_ID,
    TECH_SYSTEM_VAL,
} from '../types/index-types';

const CommonForm = ({ setIsVisible, isVisible }: any) => {
    const [form] = Form.useForm<CommonData>();
    const values = Form.useWatch([], form);

    return (
        <Form
            form={form}
            layout='vertical'
            style={{
                width: 350,
                padding: 20,
                backgroundColor: 'white',
                margin: '0 auto',
                borderRadius: 6,
            }}>
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
                    min={1}
                    max={12}
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
                name='tech'
                rules={[
                    {
                        required: true,
                        message: 'Выберите технологическую систему!',
                    },
                ]}
                style={{ width: '100%' }}>
                <Radio.Group
                // onChange={() => {}}
                // value={}
                >
                    <Space direction='vertical'>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VTSP1,
                                N: TECH_SYSTEM_ID.VTSP1,
                            }}>
                            {TECH_SYSTEM_VAL.VTSP1}
                        </Radio>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VSTP1,
                                N: TECH_SYSTEM_ID.VSTP1,
                            }}>
                            {TECH_SYSTEM_VAL.VSTP1}
                        </Radio>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VSTP2,
                                N: TECH_SYSTEM_ID.VSTP2,
                            }}>
                            {TECH_SYSTEM_VAL.VSTP2}
                        </Radio>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VTSP2,
                                N: TECH_SYSTEM_ID.VTSP2,
                            }}>
                            {TECH_SYSTEM_VAL.VTSP2}
                        </Radio>
                    </Space>
                    <Space direction='vertical'>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VTS,
                                N: TECH_SYSTEM_ID.VTS,
                            }}>
                            {TECH_SYSTEM_VAL.VTS}
                        </Radio>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VTP,
                                N: TECH_SYSTEM_ID.VTP,
                            }}>
                            {TECH_SYSTEM_VAL.VTP}
                        </Radio>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VSRTP,
                                N: TECH_SYSTEM_ID.VSRTP,
                            }}>
                            {TECH_SYSTEM_VAL.VSRTP}
                        </Radio>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VT,
                                N: TECH_SYSTEM_ID.VT,
                            }}>
                            {TECH_SYSTEM_VAL.VT}
                        </Radio>
                    </Space>
                    <Space direction='vertical'>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VSRT,
                                N: TECH_SYSTEM_ID.VSRT,
                            }}>
                            {TECH_SYSTEM_VAL.VSRT}
                        </Radio>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VTSRP,
                                N: TECH_SYSTEM_ID.VTSRP,
                            }}>
                            {TECH_SYSTEM_VAL.VTSRP}
                        </Radio>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL.VTSR,
                                N: TECH_SYSTEM_ID.VTSR,
                            }}>
                            {TECH_SYSTEM_VAL.VTSR}
                        </Radio>
                        <Radio
                            value={{
                                TechSystem: TECH_SYSTEM_VAL['VT-P'],
                                N: TECH_SYSTEM_ID['VT-P'],
                            }}>
                            {TECH_SYSTEM_VAL['VT-P']}
                        </Radio>
                    </Space>
                    {/* <Space direction='vertical'>
                        {(
                            Object.keys(TECH_SYSTEM_VAL) as Array<
                                keyof typeof TECH_SYSTEM_VAL
                            >
                        ).map((key, i) => (
                            <Radio key={i} value={key}>
                                {TECH_SYSTEM_VAL[key]}
                            </Radio>
                        ))}
                    </Space> */}
                </Radio.Group>
            </Form.Item>

            <Form.Item
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <Space>
                    <Button
                        type='primary'
                        htmlType='submit'
                        onClick={(e) => {
                            // setIsVisible(!isVisible);
                            console.log(values);
                        }}>
                        Подтвердить ввод
                    </Button>
                    <Button htmlType='reset'>Очистить</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default CommonForm;
