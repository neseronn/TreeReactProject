import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';

const AdditionalForm = () => {
    return (
        <div
            style={{
                width: '100%',
                // height: 'auto',
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
                    justifyContent: 'flex-end',
                    columnGap: '15rem',
                }}>
                <Title level={4} style={{ textAlign: 'center' }}>
                    Введите данные по машинам
                </Title>
                <Link to={'/results'}>
                    <Button>Рассчитать</Button>
                </Link>
            </div>
        </div>
    );
};

export default AdditionalForm;
