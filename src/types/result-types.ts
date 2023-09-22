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
// export type AboutAdditionalWorkCars = MonthPairData[];

export interface ResultData {
  production_volume: ProductionVolume[];
  about_additional_work_cars: MonthPairData[];
}
