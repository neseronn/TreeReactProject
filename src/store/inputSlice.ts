import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllMonthInputData, ChangedCommonInputData, CommonInputData, InputData } from '../types/index-types';
import { getSaveById } from './asyncActions/inputData';
import { EditSave } from '../types/history-types';
import { saveCalculated } from './asyncActions/history';

let DataCalculated1 = {
  CountMonth: 1,
  FirstMonth: 1,
  AvgStock: 240,
  markCar: 'Маз',
  N: 1,
  replaceableMachinePerfomance: 56,
  ShiftsNumber: 2,
  TotalStock: 555555,
  ZoneLength: 50,
};

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
  ],
};

interface NewSave {
  isLoading: boolean;
  isSuccess: boolean;
  error: null | string | undefined;
}

interface InputState {
  newSave: NewSave;
  data: InputData;
  isLoading: boolean;
  isSuccess: boolean;
  isChanged: boolean;
  error: null | string | undefined;
  isVisible: boolean;
}

const initialState: InputState = {
  newSave: {} as NewSave,
  data: {
    DataAboutRecord: {
      id: null,
      name: '',
      comment: '',
      date: null,
    },
    DataCalculated: {} as CommonInputData,
    DataMonthInfo: {
      MainMarkCars: [],
      AdditionalMarkCars: [],
      DATA: [
        {
          MainCountCars: [],
          MainCountShift: [],
          MainShiftProduction: [],
          AdditionalCountCars: [],
          AdditionalCountShift: [],
          AdditionalShiftProduction: [],
          TP: 0,
        },
      ],
    },
  },
  isChanged: false,
  isLoading: false,
  isSuccess: false,
  isVisible: false,
  error: null,
};

export const inputSlice = createSlice({
  name: 'inputData',
  initialState,
  reducers: {
    clearAllData: (state) => {
      state.data = initialState.data;
      state.error = null;
      state.isChanged = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isVisible = false;
      state.newSave = {} as NewSave;
    },
    clearCarsData: (state) => {
      state.data.DataMonthInfo.MainMarkCars = state.data.DataMonthInfo.MainMarkCars.map(() => '');
      state.data.DataMonthInfo.AdditionalMarkCars = state.data.DataMonthInfo.AdditionalMarkCars.map(() => '');
      state.data.DataMonthInfo.DATA.forEach((obj) => {
        obj.TP = 0;
        obj.MainCountCars = obj.MainCountCars.map(() => '');
        obj.MainCountShift = obj.MainCountShift.map(() => '');
        obj.MainShiftProduction = obj.MainShiftProduction.map(() => '');
        obj.AdditionalCountCars = obj.AdditionalCountCars.map(() => '');
        obj.AdditionalCountShift = obj.AdditionalCountShift.map(() => '');
        obj.AdditionalShiftProduction = obj.AdditionalShiftProduction.map(() => '');
      });
      state.isChanged = true;
    },
    // Основные данные
    setCommonData: (state, { payload }: PayloadAction<CommonInputData>) => {
      state.data.DataCalculated = payload;
    },
    changeCommonData: (state, { payload }: PayloadAction<ChangedCommonInputData>) => {
      state.data.DataCalculated = { ...state.data.DataCalculated, ...payload };
    },
    setIsChanged: (state, { payload }: PayloadAction<boolean>) => {
      state.isChanged = payload;
    },
    setDataAboutRecord: (state, { payload }: PayloadAction<EditSave>) => {
      state.data.DataAboutRecord.name = payload.name;
      state.data.DataAboutRecord.comment = payload.comment;
    },

    // Данные по машинам (месяцам)
    changeDataMonthInfo: (state, { payload }: PayloadAction<AllMonthInputData>) => {
      state.data.DataMonthInfo = payload;
    },
    changeArrLen: (
      state,
      { payload }: PayloadAction<{ isIncrease: boolean; len: number }> // isIncrease - увеличиваем или нет (уменьшаем)
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
            data.DATA[i].MainCountCars = data.DATA[i].MainCountCars.slice(0, payload.len);
            data.DATA[i].MainCountShift = data.DATA[i].MainCountShift.slice(0, payload.len);
            data.DATA[i].MainShiftProduction = data.DATA[i].MainShiftProduction.slice(0, payload.len);
            data.DATA[i].AdditionalCountCars = data.DATA[i].AdditionalCountCars.slice(0, payload.len);
            data.DATA[i].AdditionalCountShift = data.DATA[i].AdditionalCountShift.slice(0, payload.len);
            data.DATA[i].AdditionalShiftProduction = data.DATA[i].AdditionalShiftProduction.slice(0, payload.len);
          } catch {}
        }
      }
    },

    setIsVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.isVisible = payload;
    },

    setSaveSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.newSave.isLoading = payload;
    },

    setNewSaveDefault: (state) => {
      state.newSave = {} as NewSave;
    },
  },

  extraReducers(builder) {
    builder.addCase(getSaveById.fulfilled, (state, { payload }: PayloadAction<InputData>) => {
      state.data = payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isVisible = true;
      state.isChanged = false;
      state.error = null;
    });
    builder.addCase(getSaveById.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });
    builder.addCase(getSaveById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });

    builder.addCase(saveCalculated.fulfilled, (state, { payload }: PayloadAction<InputData>) => {
      state.data = payload;
      state.newSave.isLoading = false;
      state.newSave.isSuccess = true;
      state.newSave.error = null;
    });
    builder.addCase(saveCalculated.pending, (state) => {
      state.newSave.isLoading = true;
      state.newSave.isSuccess = false;
      state.newSave.error = null;
    });
    builder.addCase(saveCalculated.rejected, (state, action) => {
      state.newSave.isLoading = false;
      state.newSave.isSuccess = false;
      if (action.payload) {
        state.newSave.error = action.payload;
      } else {
        state.newSave.error = action.error.message;
      }
    });
  },
});

export const {
  clearAllData,
  clearCarsData,
  setCommonData,
  changeCommonData,
  changeDataMonthInfo,
  changeArrLen,
  setIsVisible,
  setIsChanged,
  setDataAboutRecord,
  setSaveSuccess,
  setNewSaveDefault,
} = inputSlice.actions;

export default inputSlice.reducer;
