import { configureStore } from '@reduxjs/toolkit';
import inputSlice from './inputSlice';
import resultSlice from './resultSlice';
import historySlice from './historySlice';

export const store = configureStore({
  reducer: {
    inputData: inputSlice,
    resultData: resultSlice,
    historyData: historySlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
