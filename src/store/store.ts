import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import inputSlice from './inputSlice';
// import counterReducer from './counterSlice';

export const store = configureStore({
    reducer: {
        inputData: inputSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
