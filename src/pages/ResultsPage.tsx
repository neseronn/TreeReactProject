import React, { useState } from 'react';
import { useTypedSelector } from '../store/hooks';
import { Typography } from 'antd';
import ResultDisplay from '../components/ResultDisplay';

const ResultsPage: React.FC = ({}) => {
  const { result } = useTypedSelector((store) => store.resultData);
  // const { result.с, result.без, } = useTypedSelector((store) => store.resultData);

  // React.useEffect(() => {
  //
  // }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        columnGap: '10px',
        position: 'relative',
        height: '100%',
        // width: '100%',
        // flexGrow: 1,
        overflow: 'auto',
        maxHeight: 'calc(100vh - 94px)',
      }}>
      <ResultDisplay result={result} type='с учетом' />
      <ResultDisplay result={result} type='без учета' />
    </div>
  );
};

export default ResultsPage;
