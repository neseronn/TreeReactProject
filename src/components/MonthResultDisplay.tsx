import React from 'react';
import {
  MonthData,
  MonthPairData,
  Pair,
  RowTable,
} from '../types/result-types';
import style from '../styles/descriptionItem.module.css';
import { useTypedSelector } from '../store/hooks';
import { Descriptions, Divider, Space, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { MonthInputData } from '../types/index-types';
import { techSystem, calcMonthNames } from '../common/index';

interface MonthResultDisplayProps {
  monthData: MonthData;
  initialData: MonthInputData;
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

// 2 блока (исходные и вычисления) для одного (каждого) месяца
const MonthResultDisplay = ({
  monthData,
  initialData,
  monthName,
}: MonthResultDisplayProps) => {
  const {
    N,
    TotalStock,
    AvgStock,
    ZoneLength,
    ShiftsNumber,
    replaceableMachinePerfomance,
  } = useTypedSelector((store) => store.inputData.data.DataCalculated);
  const { MainMarkCars, AdditionalMarkCars } = useTypedSelector(
    (store) => store.inputData.data.DataMonthInfo
  );
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
  if ('t1' in monthData.about_additional_work_cars[0]) {
    children.push(t1Col);
  }
  if ('t3' in monthData.about_additional_work_cars[0]) {
    children.push(t3Col);
  }
  if ('t4' in monthData.about_additional_work_cars[0]) {
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
    <div
    // style={{ width: '50%' }}
    >
      <Space direction='vertical' size={10}>
        <Divider
          orientation='left'
          children={
            <Typography.Text strong style={{ fontSize: '16px' }}>
              <span style={{ textTransform: 'capitalize' }}>{monthName}</span>,{' '}
              {TP} дней работы
            </Typography.Text>
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
              // span: 24,
              children: (
                <>
                  <DescriptionItem
                    title='Общий запас на лесосеке'
                    content={TotalStock}
                    unit='кбм'
                  />
                  <DescriptionItem
                    title='Средний запас на лесосеке'
                    content={AvgStock}
                    unit='кбм'
                  />
                  <DescriptionItem
                    title='Длина зоны вырубки'
                    content={ZoneLength}
                    unit='м'
                  />
                  <DescriptionItem
                    title='Число смен в один день на вывозке'
                    content={ShiftsNumber}
                  />
                  <DescriptionItem
                    title='Сменная производительность машин на вывозке'
                    content={replaceableMachinePerfomance}
                    unit='кбм в смену'
                  />
                </>
              ),
            },
          ]}
        />

        <Table
          // title={() => (
          //   <Typography.Text strong>
          //     <span style={{ textTransform: 'capitalize' }}>{monthName}</span>,{' '}
          //     {TP} дней работы
          //   </Typography.Text>
          // )}
          columns={columns}
          dataSource={rows}
          bordered
          size='small'
          pagination={false}
        />

        <Table
          // style={{ marginTop: '14px' }}
          title={() => (
            <Typography.Text strong>
              Необходимое число дополнительных дней работы машин
            </Typography.Text>
          )}
          columns={columnsDop}
          dataSource={monthData.about_additional_work_cars}
          bordered
          size='small'
          pagination={false}
        />

        <Descriptions
          size='small'
          layout='horizontal'
          bordered
          items={[
            {
              key: '3',
              label: 'Объём производства',
              // span: 24,
              children: (
                <>
                  <DescriptionItem
                    title='Объём производства основных машин'
                    content={monthData.production_volume.Qo}
                    unit='м³'
                  />
                  <DescriptionItem
                    title='Объём производства дополнительных машин'
                    content={monthData.production_volume.Qd}
                    unit='м³'
                  />
                  <DescriptionItem
                    title='Итого объём производства'
                    content={monthData.production_volume.Pm}
                    unit='м³'
                  />
                  <DescriptionItem
                    title='Ежедневная потребность машин на вывозке'
                    content={monthData.production_volume.Nm}
                    unit='м³'
                  />
                </>
              ),
            },
          ]}
        />
      </Space>
      {/* <Divider /> */}
    </div>
  );
};

export default MonthResultDisplay;
