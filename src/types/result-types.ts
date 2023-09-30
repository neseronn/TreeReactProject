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
  about_additional_work_with: Pair[];
  about_additional_work_without: Pair[];
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