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
        columnGap: '10px',
        position: 'relative',
        height: '100%',
        // width: '100%',
        // minWidth: '100vw',
        // minHeight: '75vh',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 145px)',
      }}>
      <ResultDisplay result={result} type='с замещением' />
      <ResultDisplay result={result} type='без замещения' />
    </div>
  );
};

export default ResultsPage;
