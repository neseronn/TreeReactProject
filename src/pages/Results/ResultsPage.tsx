import { useTypedSelector } from '../../store/hooks';
import { Alert, Button, Col, Empty, Row, Typography } from 'antd';
import MonthResultDisplay from './modules/MonthResultDisplay';
import { calcMonthNames } from '../../common';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import CommonPairGraph from './modules/CommonPairGraph';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { result, isCalculated } = useTypedSelector(
    (store) => store.resultData
  );

  const { DATA } = useTypedSelector(
    (store) => store.inputData.data.DataMonthInfo
  );
  const { FirstMonth, CountMonth } = useTypedSelector(
    (store) => store.inputData.data.DataCalculated
  );
  const monthNames = calcMonthNames(FirstMonth, CountMonth);

  if (!isCalculated) {
    return (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{ height: 400 }}
        description={<span>Расчёты не обнаружены</span>}>
        <Button type='primary' onClick={() => navigate('/')}>
          Ввести исходные данные
        </Button>
      </Empty>
    );
  } else
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

            {result.res_for_months.map((item, i) => (
              <MonthResultDisplay
                key={i}
                monthData={item}
                graphWith={result.graphs_for_every_month.graph_with[i]}
                graphWithout={result.graphs_for_every_month.graph_without[i]}
                initialData={DATA[i]}
                monthName={monthNames[i]}
              />
            ))}

            <Row>
              {/* {result.common_graphs.all_pairs.map((pair) => (
                <Title
                  // style={{ textAlign: 'center' }}
                  level={4}>
                  {pair}
                </Title>
              ))} */}
            </Row>
            <Row>
              <Col
                span={2}
                style={{
                  display: 'flex',
                  alignItems: 'space-evenly',
                  flexDirection: 'column',
                  height: '100%',
                }}>
                {result.common_graphs.all_pairs.map((pair) => (
                  <Title style={{}} level={4}>
                    {pair}
                  </Title>
                ))}
              </Col>
              <Col span={11}>
                {result.common_graphs.graph_all_months_with.map((graph, i) => (
                  <CommonPairGraph key={'s' + i} data={graph} />
                ))}
              </Col>
              <Col span={11}>
                {result.common_graphs.graph_all_months_without.map(
                  (graph, i) => (
                    <CommonPairGraph key={'w' + i} data={graph} />
                  )
                )}
              </Col>
            </Row>

            <Alert
              message={
                result.remaining_stock < 0
                  ? 'Не хватает запаса. Уменьшите срок освоения.'
                  : result.remaining_stock > 0
                  ? `Остался неосвоенный запас: ${result.remaining_stock} кбм.`
                  : 'Запас освоен полностью.'
              }
              type={
                result.remaining_stock < 0
                  ? 'warning'
                  : result.remaining_stock > 0
                  ? 'info'
                  : 'success'
              }
              showIcon
            />
          </div>
        </div>
      </>
    );
};

export default ResultsPage;
