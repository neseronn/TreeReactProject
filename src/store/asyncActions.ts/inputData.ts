import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { instance } from '../../api';
import { ResultData } from '../../types/result-types';
import {
  AllMonthInputData,
  InputData,
  SavedInputData,
} from '../../types/index-types';

export const calculateData = createAsyncThunk<ResultData, InputData>(
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

export const getSaveById = createAsyncThunk<
  SavedInputData,
  number,
  {
    rejectValue: string;
  }
>('inputData/getSaveById', async (id, thunkApi) => {
  try {
    const response = await instance.get(`/save_calculated/${id}/`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});
