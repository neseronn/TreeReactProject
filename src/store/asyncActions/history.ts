import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../api';
import { Save } from '../../types/history-types';
import { InputData, SaveInputData } from '../../types/index-types';

export const getSaves = createAsyncThunk<
  Save[],
  undefined,
  {
    rejectValue: string;
  }
>('resultData/getSaves', async (_, thunkApi) => {
  try {
    const response = await instance.get('/save_calculated/');
    console.log(response);
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

// можно переместить в inputData
export const saveCalculated = createAsyncThunk<
  InputData,
  SaveInputData,
  {
    rejectValue: string;
  }
>('inputData/saveCalculated', async (data, thunkApi) => {
  try {
    const response = await instance.post('/save_calculated/', data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const deleteSaveById = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>('historyData/deleteSaveById', async (id, thunkApi) => {
  try {
    const response = await instance.delete(`/save_calculated/${id}/`);
    console.log(response);
    return response.status;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});
