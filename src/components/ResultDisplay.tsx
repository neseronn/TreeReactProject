import { Typography, Divider } from 'antd';
import React from 'react';
import { ResultData } from '../types/result-types';
import MonthResultDisplay from './MonthResultDisplay';
import { useTypedSelector } from '../store/hooks';
import { calcMonthNames } from '../common';

interface ResultDisplayProps {
  result: ResultData;
  type: 'с замещением' | 'без замещения';
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
        // width: 'max-content',
        // width: '50%',
        // flexShrink: 1,
        // minWidth: 'min-content',
        height: '100%',

        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
      }}>
      <Typography.Title level={4}>
        Результаты моделирования {type}
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
