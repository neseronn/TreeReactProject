import { configureStore, Action } from '@reduxjs/toolkit';
import inputSlice from './inputSlice';
import resultSlice from './resultSlice';

export const store = configureStore({
  reducer: {
    inputData: inputSlice,
    resultData: resultSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
