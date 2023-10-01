import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Save } from '../types/history-types';
import { getSaves } from './asyncActions.ts/history';

interface HistoryState {
  saves: Save[];
  isSuccess: boolean;
  isLoading: boolean;
  error: null | string | any;
}

const initialState: HistoryState = {
  saves: [],
  isSuccess: false,
  isLoading: false,
  error: null,
};

export const historySlice = createSlice({
  name: 'historyData',
  initialState,
  reducers: {
    // setSuccess: (state, { payload }: PayloadAction<boolean>) => {
    //   state.isSuccess = false;
    // },
  },
  extraReducers(builder) {
    builder.addCase(
      getSaves.fulfilled,
      (state, { payload }: PayloadAction<Save[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.saves = payload;
        state.error = null;
      }
    );
    builder.addCase(getSaves.pending, (state) => {
      state.saves = [];
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });
    builder.addCase(getSaves.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.saves = [];
      if (action.payload) {
        // Здесь мы имеем доступ к ошибкам, переданным в `createAsyncThunk()`
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const {} = historySlice.actions;

export default historySlice.reducer;
