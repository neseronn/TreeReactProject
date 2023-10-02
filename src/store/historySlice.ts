import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Save } from '../types/history-types';
import { deleteSaveById, getSaves } from './asyncActions.ts/history';

interface HistoryState {
  saves: Save[];
  isSuccess: boolean;
  isLoading: boolean;
  error: null | string | any;
  deleteLoading: boolean;
  deleteSuccess: boolean;
  deleteError: null | string | any;
}

const initialState: HistoryState = {
  saves: [],
  isSuccess: false,
  isLoading: false,
  error: null,
  deleteLoading: false,
  deleteSuccess: false,
  deleteError: null,
};

export const historySlice = createSlice({
  name: 'historyData',
  initialState,
  reducers: {
    setDeleteSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.deleteSuccess = payload;
    },
    setDeleteError: (state, { payload }: PayloadAction<null | boolean>) => {
      state.deleteError = payload;
    },
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

    builder.addCase(
      deleteSaveById.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.deleteError = null;
      }
    );
    builder.addCase(deleteSaveById.pending, (state) => {
      state.deleteLoading = true;
      state.deleteSuccess = false;
      state.deleteError = null;
    });
    builder.addCase(deleteSaveById.rejected, (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      if (action.payload) {
        state.deleteError = action.payload;
      } else {
        state.deleteError = action.error.message;
      }
    });
  },
});

export const { setDeleteSuccess, setDeleteError } = historySlice.actions;

export default historySlice.reducer;
