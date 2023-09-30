import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AllMonthInputData,
  ChangedCommonInputData,
  CommonInputData,
  MonthInputData,
} from '../types/index-types';
const primer1 = {
  MainMarkCars: ['МП', 'ТТ-4', 'Тайга', 'ПЛ-1'],
  AdditionalMarkCars: ['МП', 'ТТ-4', 'Тайга', 'ПЛ-1'],
  DATA: [
    {
      MainCountCars: [1, 1, 1, 0.5],
      MainCountShift: [1, 1, 2, 1],
      MainShiftProduction: [64, 87, 48, 200],
      AdditionalCountCars: [1, 1, 1, 0.5],
      AdditionalCountShift: [1, 1, 1, 1],
      AdditionalShiftProduction: [64, 87, 48, 200],
      TP: 20,
    },
    {
      MainCountCars: [1, 1, 1, 0.5],
      MainCountShift: [1, 1, 2, 1],
      MainShiftProduction: [64, 87, 48, 200],
      AdditionalCountCars: [1, 1, 1, 0.5],
      AdditionalCountShift: [1, 1, 1, 1],
      AdditionalShiftProduction: [64, 87, 48, 200],
      TP: 20,
    },
    // {
    //   MainCountCars: [64.0, 87.0, 48.0, 200.0],
    //   MainCountShift: [1.0, 1.0, 2.0, 1.0],
    //   MainShiftProduction: [1.0, 1.0, 1.0, 0.5],
    //   AdditionalCountCars: [64.0, 87.0, 48.0, 200.0],
    //   AdditionalCountShift: [1.0, 1.0, 2.0, 1.0],
    //   AdditionalShiftProduction: [1.0, 1.0, 1.0, 0.5],
    //   TP: 24,
    // },
  ],
};

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
      CountMonth: 1,
      FirstMonth: 1,
      AvgStock: 240,
      markCar: 'Маз',
      N: 0,
      replaceableMachinePerfomance: 56,
      ShiftsNumber: 2,
      TotalStock: 100000,
      ZoneLength: 50,
    },
    DataMonthInfo:
      // {} as AllMonthInputData,
      {
        MainMarkCars: ['МП', 'ТТ-4', 'Тайга', 'ПЛ-1'],
        AdditionalMarkCars: ['МП', 'ТТ-4', 'Тайга', 'ПЛ-1'],
        DATA: [
          {
            MainCountCars: [64, 87, 48, 200],
            MainCountShift: [1, 1, 2, 1],
            MainShiftProduction: [1, 1, 1, 0.5],
            AdditionalCountCars: [64, 87, 48, 200],
            AdditionalCountShift: [1, 1, 1, 1],
            AdditionalShiftProduction: [1, 1, 1, 0.5],
            TP: 20,
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
    changeDataMonthInfo: (
      state,
      { payload }: PayloadAction<AllMonthInputData>
    ) => {
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
            while (payload.len > data?.DATA[i].MainCountCars.length) {
              data.DATA[i].MainCountCars.push('');
              data.DATA[i].MainCountShift.push('');
              data.DATA[i].MainShiftProduction.push('');
              data.DATA[i].AdditionalCountCars.push('');
              data.DATA[i].AdditionalCountShift.push('');
              data.DATA[i].AdditionalShiftProduction.push('');
            }
          } catch {}
        }
      } else {
        // Уменьшить размер массива
        data.MainMarkCars = data.MainMarkCars.slice(0, payload.len);
        data.AdditionalMarkCars = data.AdditionalMarkCars.slice(0, payload.len);
        for (let i = 0; i < data.DATA.length; i++) {
          try {
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
          } catch {}
        }
      }
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
  changeDataMonthInfo,
  changeArrLen,
  setIsVisible,
} = inputSlice.actions;

export default inputSlice.reducer;
