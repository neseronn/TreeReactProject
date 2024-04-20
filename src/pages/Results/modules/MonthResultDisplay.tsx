import React from 'react';
import { GraphDataMonth, MonthNumDataWith, MonthNumDataWithout, MonthPairData, Pair, ProductionVolume, RowTable } from '../../../types/result-types';
import style from '../../../styles/descriptionItem.module.css';
import { useTypedSelector } from '../../../store/hooks';
import { Descriptions, Divider, Space, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { MonthInputData } from '../../../types/index-types';
import { techSystem, calcMonthNames } from '../../../common/index';
import MonthPairGraph from './MonthPairGraph';

interface MonthResultDisplayProps {
  monthDataWith: Pair[];
  monthDataWithout: Pair[];
  productionVolume: ProductionVolume;
  initialData: MonthInputData;
  graphWith: GraphDataMonth;
  graphWithout: GraphDataMonth;
  monthName: string;
}

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
  unit?: string;
}

const DescriptionItem = ({ title, content, unit }: DescriptionItemProps) => (
  <div className={style.descriptionItemWrapper}>
    <p className={style.descriptionItemP}>{title}:</p>
    {content}
    <span className={style.descriptionItemP}>{unit}</span>
  </div>
);

const MonthResultDisplay = ({
  monthDataWith,
  monthDataWithout,
  productionVolume,
  initialData,
  graphWith,
  graphWithout,
  monthName,
}: MonthResultDisplayProps) => {
  const { N, TotalStock, AvgStock, ZoneLength, ShiftsNumber, replaceableMachinePerfomance, markCar } = useTypedSelector(
    (store) => store.inputData.data.DataCalculated
  );
  const { MainMarkCars, AdditionalMarkCars } = useTypedSelector((store) => store.inputData.data.DataMonthInfo);
  const { id, TP, ...monthInput } = initialData;
  const carsArr = techSystem[N].split('+');

  // props
  const props = [
    'MainMarkCars',
    'MainCountCars',
    'MainCountShift',
    'MainShiftProduction',
    'AdditionalMarkCars',
    'AdditionalCountCars',
    'AdditionalCountShift',
    'AdditionalShiftProduction',
  ];
  // values
  let arr: (number | string)[][] = Object.values(monthInput);
  arr.splice(0, 0, MainMarkCars);
  arr.splice(4, 0, AdditionalMarkCars);

  const rows: RowTable[] = [];
  carsArr.forEach((car, index) => {
    let obj: any = { car: car };
    props.forEach((prop, i) => {
      obj[prop] = arr[i][index];
    });
    rows.push(obj);
  });

  console.log(rows);

  const columns: ColumnsType<RowTable> = [
    {
      title: '',
      dataIndex: 'car',
      rowScope: 'row',
    },
    {
      title: 'Основные',
      children: [
        {
          title: 'Марка машины',
          dataIndex: 'MainMarkCars',
          key: 'MainMarkCars',
        },
        {
          title: 'Количество',
          dataIndex: 'MainCountCars',
          key: 'MainCountCars',
        },
        {
          title: 'Число смен',
          dataIndex: 'MainCountShift',
          key: 'MainCountShift',
        },
        {
          title: 'Сменная выработка',
          dataIndex: 'MainShiftProduction',
          key: 'MainShiftProduction',
        },
      ],
    },
    {
      title: 'Дополнительные',
      children: [
        {
          title: 'Марка машины',
          dataIndex: 'AdditionalMarkCars',
          key: 'AdditionalMarkCars',
        },
        {
          title: 'Количество',
          dataIndex: 'AdditionalCountCars',
          key: 'AdditionalCountCars',
        },
        {
          title: 'Число смен',
          dataIndex: 'AdditionalCountShift',
          key: 'AdditionalCountShift',
        },
        {
          title: 'Сменная выработка',
          dataIndex: 'AdditionalShiftProduction',
          key: 'AdditionalShiftProduction',
        },
      ],
    },
  ];

  const t1Col = {
    title: 'Число дней создания запасов, t1',
    dataIndex: 't1',
    key: 't1',
  };
  const t3Col = {
    title: 'Число дней работы с дополнительными машинами, t3',
    dataIndex: 't3',
    key: 't3',
  };
  const t4Col = {
    title: 'Число дней выработки запасов, t4',
    dataIndex: 't4',
    key: 't4',
  };

  let children: Array<{ title: string; dataIndex: string; key: string }> = [];
  if ('t1' in monthDataWith[0]) {
    children.push(t1Col);
  }
  if ('t3' in monthDataWith[0]) {
    children.push(t3Col);
  }
  if ('t4' in monthDataWith[0]) {
    children.push(t4Col);
  }

  const columnsDop: ColumnsType<Pair> = [
    {
      title: 'Операции',
      dataIndex: 'car',
      rowScope: 'row',
    },
    {
      title: 'Объём запасов',
      children: [
        {
          title: 'Zt',
          dataIndex: 'Zt',
          key: 'Zt',
        },
        {
          title: 'Zг',
          dataIndex: 'Zg',
          key: 'Zg',
        },
      ],
    },
    {
      title: 'Дополнительное время работы машин',
      children: children,
    },
  ];

  return (
    <>
      <Divider
        orientation='center'
        children={
          <Typography.Title
            level={4}
            // style={{ fontSize: '16px' }}
          >
            <span style={{ textTransform: 'capitalize' }}>{monthName}</span>, дней работы:
            {' ' + TP}
          </Typography.Title>
        }
      />
      <Descriptions
        size='small'
        layout='horizontal'
        bordered
        items={[
          {
            key: 1,
            label: 'Исходные данные',
            children: (
              <>
                <DescriptionItem title='Общий запас на лесосеке' content={TotalStock} unit='кбм' />
                <DescriptionItem title='Средний запас на лесосеке' content={AvgStock} unit='кбм' />
                <DescriptionItem title='Длина зоны вырубки' content={ZoneLength} unit='м' />
                <DescriptionItem title='Число смен в один день на вывозке' content={ShiftsNumber} />
                <DescriptionItem title='Сменная производительность машин на вывозке' content={replaceableMachinePerfomance} unit='кбм в смену' />
              </>
            ),
          },
        ]}
      />

      <Table columns={columns} dataSource={rows} bordered size='small' pagination={false} />

      <Table
        title={() => (
          <Typography.Text strong>
            <span style={{ color: 'rgba(0, 0, 0, 45%)' }}>Необходимое число дополнительных дней работы машин</span> (С УЧЕТОМ НАЛОЖЕНИЯ)
          </Typography.Text>
        )}
        columns={columnsDop}
        dataSource={monthDataWith}
        bordered
        size='small'
        pagination={false}
      />
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
          padding: '10px 0',
        }}>
        {graphWith.map((graph, index) => (
          <MonthPairGraph key={'graph' + graph.pair + index} pair={graph.pair} data={graph.data} />
        ))}
      </div>

      <Table
        title={() => (
          <Typography.Text strong>
            <span style={{ color: 'rgba(0, 0, 0, 45%)' }}>Необходимое число дополнительных дней работы машин</span> (БЕЗ УЧЕТА НАЛОЖЕНИЯ)
          </Typography.Text>
        )}
        columns={columnsDop}
        dataSource={monthDataWithout}
        bordered
        size='small'
        pagination={false}
      />
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
          padding: '10px 0',
        }}>
        {graphWithout.map((graph, index) => (
          <MonthPairGraph key={'graph' + graph.pair + index} pair={graph.pair} data={graph.data} />
        ))}
      </div>

      <Descriptions
        size='small'
        layout='horizontal'
        bordered
        items={[
          {
            key: '3',
            label: 'Объём производства',
            children: (
              <>
                <DescriptionItem title='Объём производства основных машин' content={productionVolume.Qo} unit='м³ на шт.' />
                <DescriptionItem title='Объём производства дополнительных машин' content={productionVolume.Qd} unit='м³ на шт.' />
                <DescriptionItem title='Итого объём производства' content={productionVolume.Pm} unit='м³ на шт.' />
                <DescriptionItem title={`Ежедневная потребность ${markCar} на вывозке`} content={productionVolume.Nm} unit='шт.' />
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default MonthResultDisplay;
