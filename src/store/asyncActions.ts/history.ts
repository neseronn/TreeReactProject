import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../api';
import { Save } from '../../types/history-types';

// interface Error {
//   errorMessage: string;
// }

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
