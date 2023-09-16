import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import DataEntry from './../pages/DataEntry';
import {
  AllMonthInputData,
  ChangedAllMonthInputData,
  ChangedCommonInputData,
  CommonInputData,
  MonthInputData,
} from '../types/index-types';

interface MonthPayload {
  index: number;
  data: MonthInputData;
}

interface MarkCars {
  MainMarkCars: string[];
  AdditionalMarkCars: string[];
}

interface InputState {
  data: {
    DataCalculated: CommonInputData;
    DataMonthInfo: AllMonthInputData;
  };
  isLoading: boolean;
  isVisible: boolean;
  error: null | string;
}

const initialState: InputState = {
  data: {
    // DataCalculated: {} as CommonInputData,
    DataCalculated: {
      CountMonth: 2,
      AvgStock: 0,
      FirstMonth: 3,
      markCar: '',
      N: 3,
      replaceableMachinePerfomance: 233,
      ShiftsNumber: 1,
      TotalStock: 1,
      ZoneLength: 1,
    },
    DataMonthInfo:
      // {} as AllMonthInputData,
      {
        MainMarkCars: ['МП', 'ТТ-4', 'Тайга', 'ПЛ-1'],
        AdditionalMarkCars: ['МП', 'ТТ-4', 'Тайга', 'ПЛ-1'],
        DATA: [
          {
            MainCountCars: [64.0, 87.0, 48.0, 200.0],
            MainCountShift: [1.0, 1.0, 2.0, 1.0],
            MainShiftProduction: [1.0, 1.0, 1.0, 0.5],
            AdditionalCountCars: [64.0, 87.0, 48.0, 200.0],
            AdditionalCountShift: [1.0, 1.0, 2.0, 1.0],
            AdditionalShiftProduction: [1.0, 1.0, 1.0, 0.5],
            TP: 20,
          },
          {
            MainCountCars: [64.0, 87.0, 48.0, 200.0],
            MainCountShift: [1.0, 1.0, 2.0, 1.0],
            MainShiftProduction: [1.0, 1.0, 1.0, 0.5],
            AdditionalCountCars: [64.0, 87.0, 48.0, 200.0],
            AdditionalCountShift: [1.0, 1.0, 2.0, 1.0],
            AdditionalShiftProduction: [1.0, 1.0, 1.0, 0.5],
            TP: 24,
          },
        ],
      },
  },
  isLoading: false,
  isVisible: false,
  error: null,
};

export const inputSlice = createSlice({
  name: 'inputData',
  initialState,
  reducers: {
    // Основные данные
    setCommonData: (state, { payload }: PayloadAction<CommonInputData>) => {
      state.data.DataCalculated = payload;
    },
    changeCommonData: (
      state,
      { payload }: PayloadAction<ChangedCommonInputData>
    ) => {
      state.data.DataCalculated = { ...state.data.DataCalculated, ...payload };
    },
    // Внешние общие данные
    setTechSystem: (state, { payload }: PayloadAction<string[]>) => {
      // state.tech = payload;
    },

    // Данные по машинам (месяцам)
    // setDataMonthInfo: (
    //   state,
    //   { payload }: PayloadAction<AllMonthInputData>
    // ) => {
    //   state.data.DataMonthInfo = payload;
    // },
    changeDataMonthInfo: (
      state,
      { payload }: PayloadAction<AllMonthInputData>
    ) => {
      // state.data.DataMonthInfo = { ...state.data.DataMonthInfo, ...payload };
      state.data.DataMonthInfo = payload;
    },
    changeArrLen: (
      state,
      { payload }: PayloadAction<{ isIncrease: boolean; len: number }>
    ) => {
      // if (state.data.DataMonthInfo.AdditionalMarkCars.length > payload.length) {
      //   state.data.DataMonthInfo.AdditionalMarkCars.pop();
      // }
      let data = state.data.DataMonthInfo;
      if (payload.isIncrease) {
        // Увеличить размер массива
        while (payload.len > data.MainMarkCars.length) {
          data.MainMarkCars.push('');
          data.AdditionalMarkCars.push('');
        }

        for (let i = 0; i < data.DATA.length; i++) {
            try {
            while (payload.len > data.DATA[i].MainCountCars.length) {
              data.DATA[i].MainCountCars.push(0);
              data.DATA[i].MainCountShift.push(0);
              data.DATA[i].MainShiftProduction.push(0);
              data.DATA[i].AdditionalCountCars.push(0);
              data.DATA[i].AdditionalCountShift.push(0);
              data.DATA[i].AdditionalShiftProduction.push(0);
            }
          }
            catch{
            }
      }
      } else {
        // Уменьшить размер массива
        data.MainMarkCars = data.MainMarkCars.slice(0, payload.len);
        data.AdditionalMarkCars = data.AdditionalMarkCars.slice(0, payload.len);
        for (let i = 0; i < data.DATA.length; i++) {
          try{
          data.DATA[i].MainCountCars = data.DATA[i].MainCountCars.slice(
            0,
            payload.len
          );
          data.DATA[i].MainCountShift = data.DATA[i].MainCountShift.slice(
            0,
            payload.len
          );
          data.DATA[i].MainShiftProduction = data.DATA[
            i
          ].MainShiftProduction.slice(0, payload.len);
          data.DATA[i].AdditionalCountCars = data.DATA[
            i
          ].AdditionalCountCars.slice(0, payload.len);
          data.DATA[i].AdditionalCountShift = data.DATA[
            i
          ].AdditionalCountShift.slice(0, payload.len);
          data.DATA[i].AdditionalShiftProduction = data.DATA[
            i
          ].AdditionalShiftProduction.slice(0, payload.len);
        }
        catch{
        }
      }
      }
    },
    // setMonthData: (state, { payload }: PayloadAction<MonthPayload>) => {
    //   state.data.DataMonthInfo.DATA[payload.index] = payload.data;
    // },

    // setDATA: (state, { payload }: PayloadAction<MonthInputData[]>) => {
    //   state.data.DataMonthInfo.DATA = payload;
    // },
    removeLastMonthData: (state, action) => {
      state.data.DataMonthInfo.MainMarkCars.pop();
    },

    setIsVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.isVisible = payload;
    },

    // setSmth: (state, { payload }: PayloadAction<types>) => {
    //     state.smth = payload;
    // },
  },
});

export const {
  setCommonData,
  changeCommonData,
  // setMonthData,
  changeDataMonthInfo,
  changeArrLen,

  removeLastMonthData,
  setIsVisible,
} = inputSlice.actions;

export default inputSlice.reducer;
