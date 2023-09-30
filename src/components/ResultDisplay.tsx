import { Typography, Divider } from 'antd';
import React from 'react';
import { ResultData } from '../types/result-types';
import MonthResultDisplay from './MonthResultDisplay';
import { useTypedSelector } from '../store/hooks';
import { calcMonthNames } from '../common';

interface ResultDisplayProps {
  result: ResultData;
  type: 'с учетом' | 'без учета';
}

const ResultDisplay = ({ result, type }: ResultDisplayProps) => {
  const { DATA } = useTypedSelector(
    (store) => store.inputData.data.DataMonthInfo
  );
  const { FirstMonth, CountMonth } = useTypedSelector(
    (store) => store.inputData.data.DataCalculated
  );
  const monthNames = calcMonthNames(FirstMonth, CountMonth);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        rowGap: '14px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
      }}>
      <Typography.Title level={4}>
        <span style={{ color: 'rgba(0, 0, 0, 45%)' }}>
          Математические модели расчета объемов запасов{' '}
        </span>
        {type + ' '}
        наложения{' '}
        <span style={{ color: 'rgba(0, 0, 0, 45%)' }}>
          времени работы дополнительных машин на смежных операциях
        </span>
      </Typography.Title>

      {result.map((item, i) => (
        <MonthResultDisplay
          key={i}
          monthData={item}
          initialData={DATA[i]}
          monthName={monthNames[i]}
        />
      ))}

      {/* <Typography>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Typography> */}
    </div>
  );
};

export default ResultDisplay;
