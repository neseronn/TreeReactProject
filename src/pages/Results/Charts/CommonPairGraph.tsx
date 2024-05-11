import { Line } from '@ant-design/plots';
import { GraphPointCommon, PairGraphPoints } from '../../../types/result-types';

interface CommonPairGraphProps {
  data: PairGraphPoints;
  maxМolumeStocks: number;
}

const CommonPairGraph = ({ data, maxМolumeStocks }: CommonPairGraphProps) => {
  const config = {
    data,
    xField: 'daysCount',
    yField: 'volumeStocks',
    seriesField: 'name',
    color: ['#999', '#888', '#000'],
    lineStyle: ({ name }: GraphPointCommon) => {
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
      // tickCount: 8,
      label: {
        // autoRotate: false,
        // rotate: Math.PI / 6,
        offset: 10,
        style: {
          fill: '#aaa',
          fontSize: 14,
        },
        formatter: (daysCount: string) => daysCount,
      },
      title: {
        text: 'Число рабочих дней',
        style: {
          fontSize: 16,
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
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.04)',
      },
    },
    yAxis: {
      max: maxМolumeStocks,
      label: {
        autoRotate: false,
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: (volumeStock: string) => volumeStock + ' кбм/га',
      },
      title: {
        text: 'Объем запаса',
        style: {
          fontSize: 16,
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
    // label
    label: {
      layout: [
        {
          type: 'hide-overlap',
        },
      ],
      style: {
        textAlign: 'center',
      },
      formatter: (item: any) => item.volumeStocks,
    },
    // point
    point: {
      size: 5,
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
    meta: {
      daysCount: {
        range: [0, 1],
      },
    },
  };

  return (
    <div style={{ minWidth: '32em' }}>
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

export default CommonPairGraph;
