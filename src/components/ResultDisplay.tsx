import { Typography } from 'antd';
import React from 'react';
import { ResultData } from '../types/result-types';

interface ResultDisplayProps {
  result: ResultData;
  type: 'с замещением' | 'без замещения';
}

const ResultDisplay = ({ result, type }: ResultDisplayProps) => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#cbebfa',
        padding: '16px',
      }}>
      <Typography.Title level={4}>
        Результаты моделирования {type}
      </Typography.Title>
      <Typography>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Typography>
    </div>
  );
};

export default ResultDisplay;
