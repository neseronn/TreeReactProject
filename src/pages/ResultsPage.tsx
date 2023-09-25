import React, { MutableRefObject, useState, useRef } from 'react';
import { useTypedSelector } from '../store/hooks';
import { Button, Typography } from 'antd';
import ResultDisplay from '../components/ResultDisplay';
import generatePDF from 'react-to-pdf';

const ResultsPage = ({}: any) => {
  const { result } = useTypedSelector((store) => store.resultData);
  const ref = useRef<HTMLDivElement | null>(null);

  // const { result.с, result.без, } = useTypedSelector((store) => store.resultData);

  // React.useEffect(() => {
  //
  // }, []);

  return (
    <>
      <div
        ref={ref}
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
        <button onClick={() => generatePDF(ref, { filename: 'page.pdf' })}>
          Скачать PDF
        </button>
        <ResultDisplay result={result} type='с учетом' />
        <ResultDisplay result={result} type='без учета' />
      </div>
    </>
  );
};

export default ResultsPage;
