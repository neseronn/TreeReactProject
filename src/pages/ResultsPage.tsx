import React, { useState } from 'react';
import { useTypedSelector } from '../store/hooks';
import { Typography } from 'antd';
import ResultDisplay from '../components/ResultDisplay';

const ResultsPage: React.FC = ({}) => {
  const { result } = useTypedSelector((store) => store.resultData);

  // React.useEffect(() => {
  //
  // }, []);

  return (
    <>
      <ResultDisplay result={result} type='с замещением' />
      <ResultDisplay result={result} type='без замещения' />
      {/* <Typography>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Typography> */}
    </>
  );
};

export default ResultsPage;
