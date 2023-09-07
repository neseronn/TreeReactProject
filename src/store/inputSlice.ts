import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AllMonthInputData, CommonInputData } from '../types/index-types';

interface InputState {
    data: {
        DataCalculated: CommonInputData;
        DataMonthInfo: AllMonthInputData;
    };
}

const initialState: InputState = {
    data: {
        DataCalculated: {} as CommonInputData,
        DataMonthInfo: {
            MainMarkCars: [],
            AdditionalMarkCars: [],
            DATA: [],
        },
    },
    // isLoading: false,
    // error: null,
};

export const inputSlice = createSlice({
    name: 'inputData',
    initialState,
    reducers: {
        setCommonData: (state, { payload }: PayloadAction<CommonInputData>) => {
            state.data.DataCalculated = payload;
        },
        // setSmth: (state, { payload }: PayloadAction<types>) => {
        //     state.smth = payload;
        // },
    },
});

export const { setCommonData } = inputSlice.actions;

export default inputSlice.reducer;
