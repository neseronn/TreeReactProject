import { type } from 'os';

// Объем производства
export interface ProductionVolume {
  Tp: number;
  Qo: number;
  Pm: number;
  Qd: number;
  Nm: number;
}

export interface Pair {
  car: string;
  Zt: number;
  Zg: number;
  t1?: number;
  t3: number;
  t4?: number;
}

// Массив из объектов данных в одном месяце
export type MonthPairData = Pair[];

// Данные по необходимому числу дополнительных дней работы машин

export interface MonthData {
  production_volume: ProductionVolume;
  about_additional_work_cars: MonthPairData;
}

export type ResultData = MonthData[];

export interface RowTable {
  car: string;
  MainMarkCars: string;
  MainCountCars: number;
  MainCountShift: number;
  MainShiftProduction: number;
  AdditionalMarkCars: string;
  AdditionalCountCars: number;
  AdditionalCountShift: number;
  AdditionalShiftProduction: number;
}

// [
//   {
//     production_volume: {
//       Tp: 20,
//       Qo: 1280,
//       Pm: 2000,
//       Qd: 720,
//       Nm: 1,
//     },
//     about_additional_work_cars_with: [
//       {
//         car: 'В-Т',
//         Zt: 60,
//         Zg: 300.9,
//         t1: 4.7,
//         t3: 8.61,
//       },
//       {
//         car: 'Т-С',
//         Zt: 96,
//         Zg: 281.4,
//         t1: 3.23,
//         t3: 2.51,
//       },
//       {
//         car: 'С-П',
//         Zt: 100,
//         Zg: 167,
//         t1: 1.74,
//         t3: 1.52,
//       },
//     ],
//     about_additional_work_cars_without: [
//       {
//         car: 'В-Т',
//         Zt: 60,
//         Zg: 300.9,
//         t1: 4.7,
//         t3: 8.61,
//       },
//       {
//         car: 'Т-С',
//         Zt: 96,
//         Zg: 281.4,
//         t1: 3.23,
//         t3: 2.51,
//       },
//       {
//         car: 'С-П',
//         Zt: 100,
//         Zg: 167,
//         t1: 1.74,
//         t3: 1.52,
//       },
//     ],
//   },
//   {
//     production_volume: {
//       Tp: 20,
//       Qo: 1280,
//       Pm: 2000,
//       Qd: 720,
//       Nm: 1,
//     },
//     about_additional_work_cars_with: [
//       {
//         car: 'В-Т',
//         Zt: 60,
//         Zg: 317.5,
//         t3: 9.2,
//         t4: 3.65,
//       },
//       {
//         car: 'Т-С',
//         Zt: 96,
//         Zg: 284.4,
//         t3: 2.55,
//         t4: 2.96,
//       },
//       {
//         car: 'С-П',
//         Zt: 100,
//         Zg: 167.2,
//         t3: 1.53,
//         t4: 1.67,
//       },
//     ],
//     about_additional_work_cars_without: [
//       {
//         car: 'В-Т',
//         Zt: 60,
//         Zg: 300.9,
//         t1: 4.7,
//         t3: 8.61,
//       },
//       {
//         car: 'Т-С',
//         Zt: 96,
//         Zg: 281.4,
//         t1: 3.23,
//         t3: 2.51,
//       },
//       {
//         car: 'С-П',
//         Zt: 100,
//         Zg: 167,
//         t1: 1.74,
//         t3: 1.52,
//       },
//     ],
//   },
// ];
