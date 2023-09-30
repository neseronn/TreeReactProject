import { useTypedSelector } from '../store/hooks';
import { Typography } from 'antd';
import MonthResultDisplay from '../components/MonthResultDisplay';
import { calcMonthNames } from '../common';

const ResultsPage = () => {
  const { result } = useTypedSelector((store) => store.resultData);

  const { DATA } = useTypedSelector(
    (store) => store.inputData.data.DataMonthInfo
  );
  const { FirstMonth, CountMonth } = useTypedSelector(
    (store) => store.inputData.data.DataCalculated
  );
  const monthNames = calcMonthNames(FirstMonth, CountMonth);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: '10px',
          position: 'relative',
          width: 'max-content',
          height: '100%',
          overflow: 'auto',
        }}>
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
            {' с учетом и без учета наложения '}
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
      </div>
    </>
  );
};

export default ResultsPage;
