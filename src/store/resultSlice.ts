import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultData } from '../types/result-types';
import { calculateData } from './asyncActions.ts/inputData';

interface ResultState {
  result: ResultData;
  isCalculated: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  error: null | string | any;
}

const initialState: ResultState = {
  result: [] as ResultData,
  isCalculated: false,
  isSuccess: false,
  isLoading: false,
  error: null,
};

export const resultSlice = createSlice({
  name: 'resultData',
  initialState,
  reducers: {
    setSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isSuccess = false;
    },
    setCalculated: (state, { payload }: PayloadAction<boolean>) => {
      state.isCalculated = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      calculateData.fulfilled,
      (state, { payload }: PayloadAction<ResultData>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.result = payload;
        state.error = null;
        state.isCalculated = true;
      }
    );
    builder.addCase(calculateData.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isCalculated = false;
      state.error = null;
    });
    builder.addCase(calculateData.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isCalculated = false;
      if (action.payload) {
        // Здесь мы имеем доступ к ошибкам, переданным в `createAsyncThunk()`
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { setSuccess, setCalculated } = resultSlice.actions;

export default resultSlice.reducer;
