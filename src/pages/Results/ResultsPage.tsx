import { useTypedSelector } from '../../store/hooks';
import { Alert, Button, Col, Empty, Row, Typography } from 'antd';
import MonthResultDisplay from './MonthResultDisplay/MonthResultDisplay';
import CommonPairGraph from './Charts/CommonPairGraph';
import { calcMonthNames } from '../../common';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import style from './ResultPage.module.scss';
import { MonthInputData } from '../../types/index-types';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { result, isCalculated } = useTypedSelector((store) => store.resultData);

  const { DATA } = useTypedSelector((store) => store.inputData.data.DataMonthInfo);
  const { FirstMonth, CountMonth, Company, CuttingArea } = useTypedSelector((store) => store.inputData.data.DataCalculated);
  const monthNames = calcMonthNames(FirstMonth, CountMonth);

  const getData = (data: MonthInputData) => {
    let { TP, ...restData } = data;
    return restData;
  };

  return (
    <>
      {!isCalculated ? (
        <Empty
          image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
          imageStyle={{ height: 400 }}
          description={<span>Расчёты не обнаружены</span>}>
          <Button type='primary' onClick={() => navigate('/')}>
            Ввести исходные данные
          </Button>
        </Empty>
      ) : (
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
              <span style={{ color: 'rgba(0, 0, 0, 45%)' }}>Математические модели расчета объемов запасов </span>
              {' с учетом и без учета наложения '}
              <span style={{ color: 'rgba(0, 0, 0, 45%)' }}>времени работы дополнительных машин на смежных операциях</span>
            </Typography.Title>

            <div className={style.top}>
              <div className={style.top_Company}>
                <Typography.Text className={style.top_Company_label}>Предприятие</Typography.Text>
                <Typography.Text className={style.top_Company_value}>{Company}</Typography.Text>
              </div>
              <div className={style.top_CuttingArea}>
                <Typography.Text className={style.top_CuttingArea_label}>Лесосека, номер квартала</Typography.Text>
                <Typography.Text className={style.top_CuttingArea_value}>{CuttingArea}</Typography.Text>
              </div>
            </div>

            {/* Для каждого месяца выводим данные по нему */}
            {!!result.data_with.res_for_months &&
              result.data_with.res_for_months.map((elem: any, index) => {
                if (!!DATA[index])
                  return (
                    <MonthResultDisplay
                      key={'MonthResDisp' + index}
                      monthDataWith={result.data_with?.res_for_months[index].about_additional_work_with}
                      monthDataWithout={result.data_without?.res_for_months[index].about_additional_work_without}
                      productionVolume={result.data_with?.res_for_months[index].production_volume}
                      graphWith={result.graphs_for_every_month?.graph_with[index]}
                      graphWithout={result.graphs_for_every_month?.graph_without[index]}
                      monthInput={getData(DATA[index])}
                      TP={DATA[index].TP}
                      monthName={monthNames[index]}
                      maxМolumeStocks={result.max_volume_stocks}
                    />
                  );
              })}

            <Row></Row>
            <Row>
              <Col span={2} className={style.pairColumn}>
                {result.data_with.common_graphs.all_pairs.map((pair) => (
                  <div key={`TitlePair${pair}`} className={style.pairColumn_block}>
                    <Title level={4}>{pair}</Title>
                  </div>
                ))}
              </Col>
              <Col span={11}>
                {result.data_with.common_graphs.graph_all_months_with.map((graph, i) => (
                  <CommonPairGraph key={'s' + i} data={graph} maxМolumeStocks={result.max_volume_stocks} />
                ))}
              </Col>
              <Col span={11}>
                {result.data_without.common_graphs.graph_all_months_without.map((graph, i) => (
                  <CommonPairGraph key={'w' + i} data={graph} maxМolumeStocks={result.max_volume_stocks} />
                ))}
              </Col>
            </Row>

            <Alert
              message={
                result.data_with.remaining_stock < 0
                  ? 'Не хватает запаса. Уменьшите срок освоения.'
                  : result.data_with.remaining_stock > 0
                  ? `Остался неосвоенный запас: ${result.data_with.remaining_stock} кбм.`
                  : 'Запас освоен полностью.'
              }
              type={result.data_with.remaining_stock < 0 ? 'warning' : result.data_with.remaining_stock > 0 ? 'info' : 'success'}
              showIcon
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsPage;
