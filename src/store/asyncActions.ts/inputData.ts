import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { instance } from '../../api';
import { ResultData } from '../../types/result-types';
import { AllMonthInputData, inputData } from '../../types/index-types';

export const calculateData = createAsyncThunk<ResultData, inputData>(
  'resultData/calculate',
  async (data, thunkApi) => {
    try {
      const response = await instance.post('/calculating/', { ...data });
      // const response = await axios.post(
      //   'http://127.0.0.1:8000/api/v1/calculating/',
      //   { ...data }
      // );
      console.log(response);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
      // return thunkApi.rejectWithValue(error.message);
    }
  }
);
