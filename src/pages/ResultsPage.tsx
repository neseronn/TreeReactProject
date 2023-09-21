import React, { useState } from 'react';
import { useTypedSelector } from '../store/hooks';
import { Typography } from 'antd';

const ResultsPage: React.FC = ({}) => {
  const { data } = useTypedSelector((store) => store.inputData);

  // React.useEffect(() => {
  //
  // }, []);

  return (
    <>
      <p>Результаты ЪЪЪ</p>
      <Typography>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Typography>
    </>
  );
};

export default ResultsPage;
