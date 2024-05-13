import React, { useState, useEffect } from 'react';
import CommonForm from './CommonForm/CommonForm';
import MonthsFormList from './MonthsFormList/MonthsFormList';
import { useTypedSelector } from '../../store/hooks';
import { changeDataMonthInfo, setIsVisible } from '../../store/inputSlice';
import { useNavigate } from 'react-router-dom';
import { AllMonthInputData, CommonInputData } from '../../types/index-types';
import { Form, message } from 'antd';
import { calculateData } from '../../store/asyncActions/inputData';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setSuccess } from '../../store/resultSlice';

const DataEntry: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [commonForm] = Form.useForm<CommonInputData>();
  const [monthsForm] = Form.useForm<AllMonthInputData>();
  const { isVisible } = useTypedSelector((store) => store.inputData);
  const { isLoading, error, isSuccess, isCalculated } = useTypedSelector(
    (store) => store.resultData
  );

  const [disableForm, setDisableForm] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState<boolean>(false);

  const key = 'updatable';

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      setLoad(true);
      messageApi.open({
        key,
        type: 'loading',
        content: 'Загрузка...',
        duration: 0,
      });
    }

    isSuccess &&
      messageApi
        .open({
          key,
          type: 'success',
          content: 'Расчеты выполнены!',
          duration: 1,
        })
        .then(() => {
          navigate('/results');
          setLoad(false);
          dispatch(setSuccess(false));
        });

    error &&
      messageApi
        .open({
          key,
          type: 'error',
          content:
            error === 'Request failed with status code 400'
              ? 'Данные по машинам введены некорректно!'
              : error,
          duration: 2,
        })
        .then(() => {
          setLoad(false);
        });
  }, [isLoading]);

  /**
   * (onFinish) При отправке 2-й формы. Отправляет свои данные в redux. Если расчитано, переводит на /results, иначе делает запрос для расчета, передавая данные из двух форм
   * @param values - данные 2-й формы
   */
  const onFinish = (values: AllMonthInputData) => {
    console.log('FINISH');
    // Отправка данных по 2й форме в редакс
    dispatch(changeDataMonthInfo(values));
    if (isCalculated) {
      navigate('/results');
    } else {
      // в запрос передаем данные из двух форм
      dispatch(
        calculateData({
          DataCalculated: commonForm.getFieldsValue(),
          DataMonthInfo: monthsForm.getFieldsValue(),
        })
      );
    }
  };

  /**
   * (onFinishFailed) При ошибке отправки 2-й формы показывает уведомление об этом
   * @param errorInfo - информация об ошибке
   */
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
    messageApi.open({
      type: 'warning',
      content: 'Не все данные по машинам заполнены!',
    });
  };

  return (
    <>
      {contextHolder}

      <CommonForm
        form={commonForm}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setDisableForm={setDisableForm}
      />

      {isVisible && (
        <MonthsFormList
          form={monthsForm}
          isVisible={isVisible}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          loadBtn={load}
          disableForm={disableForm}
          setDisableForm={setDisableForm}
        />
      )}
    </>
  );
};

export default DataEntry;
