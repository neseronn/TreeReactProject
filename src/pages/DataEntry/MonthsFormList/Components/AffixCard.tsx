import React from 'react';
import style from '../MonthsFormList.module.scss';
import { Affix, Card, Typography } from 'antd';

interface AffixCardProps {
  tech: string[];
}

const AffixCard = ({ tech }: AffixCardProps) => {
  return (
    <Affix offsetTop={16}>
      <Card size='small' className={style.Container_form_card}>
        <div style={{ display: 'flex', width: '100%' }}>
          <Card.Grid
            hoverable={false}
            className={style.gridTop}
            style={{
              flexBasis: '50%',
            }}>
            <Typography.Text strong>Основные</Typography.Text>
          </Card.Grid>

          <Card.Grid
            hoverable={false}
            className={style.gridTop}
            style={{
              flexBasis: '50%',
            }}>
            <Typography.Text strong>Дополнительные</Typography.Text>
          </Card.Grid>
        </div>

        <Card.Grid
          hoverable={false}
          className={style.gridTop}
          style={{
            flexBasis: '10%',
            flexGrow: 1,
          }}>
          <Typography.Text strong>Параметры</Typography.Text>
        </Card.Grid>
        {tech.map((car, index) => (
          <Card.Grid
            key={index}
            hoverable={false}
            className={style.gridTop}
            style={{
              flexBasis: '10%',
              flexGrow: 1,
            }}>
            <Typography.Text strong>{car}</Typography.Text>
          </Card.Grid>
        ))}

        <Card.Grid hoverable={false} className={style.gridTop} style={{ flexBasis: '10%', flexGrow: 1 }}>
          <Typography.Text strong>Параметры</Typography.Text>
        </Card.Grid>
        {tech.map((car, index) => (
          <Card.Grid
            key={index}
            hoverable={false}
            className={style.gridTop}
            style={{
              flexBasis: '10%',
              flexGrow: 1,
            }}>
            <Typography.Text strong>{car}</Typography.Text>
          </Card.Grid>
        ))}
      </Card>
    </Affix>
  );
};

export default AffixCard;
