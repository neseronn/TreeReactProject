import { Line } from '@ant-design/charts';
import React from 'react';
import {
  GraphPairDataMonth,
  GraphPointMonth,
} from '../../../types/result-types';
import Title from 'antd/es/typography/Title';

const MonthPairGraph = ({ pair, data }: GraphPairDataMonth) => {
  const config = {
    data,
    xField: 'Tp',
    yField: 'volumeStocks',
    seriesField: 'name',
    color: ['#000', '#888'],
    lineStyle: ({ name }: GraphPointMonth) => {
      if (name === 'Zg') {
        return {
          lineDash: [4, 4],
          opacity: 1,
        };
      }

      return {
        opacity: 1,
      };
    },
    xAxis: {
      nice: true,
      label: {
        offset: 10,
        style: {
          fill: '#aaa',
          fontSize: 14,
        },
        formatter: (Tp: any) => Tp + ' дн.',
      },
      title: {
        text: 'Число рабочих дней',
        style: {
          fontSize: 14,
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
    },
    yAxis: {
      max: 1000,
      label: {
        autoRotate: false,
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: (volumeStock: any) => `${volumeStock} кбм/га`,
      },
      title: {
        text: 'Объем запаса',
        style: {
          fontSize: 14,
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
    },
    label: {
      layout: [
        {
          type: 'hide-overlap',
        },
      ],
      style: {
        textAlign: 'right',
      },
      formatter: (item: any) => item.value,
    },
    point: {
      size: 4,
      style: {
        lineWidth: 1,
        fillOpacity: 1,
      },
      shape: (item: any) => {
        if (item.name === 'Zg') {
          return 'circle';
        }

        return 'diamond';
      },
    },
  };

  return (
    <div style={{minWidth: '32em'}}>
      <Title style={{textAlign: 'center'}} level={4}>
        {pair}
      </Title>
      <Line
        height={300}
        {...config}
        legend={{
          position: 'top-right',
          itemName: {
            style: {
              fill: '#000',
            },
            formatter: (name: any) => name,
          },
        }}
      />
    </div>
  );
};

export default MonthPairGraph;
