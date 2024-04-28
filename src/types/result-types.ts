import { OmitProps } from 'antd/es/transfer/ListBody';

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

// production_volume по месяцам
export interface MonthProdVol {
  production_volume: ProductionVolume;
}
// Числовые данные по месяцам (с)
export interface MonthNumDataWith {
  about_additional_work_with: Pair[];
}
// Числовые данные по месяцам (без)
export interface MonthNumDataWithout {
  about_additional_work_without: Pair[];
}
// Вычисленные данные по месяцам (с)
export type MonthDataWith = MonthNumDataWith & MonthProdVol;
// Вычисленные данные по месяцам (без)
export type MonthDataWithout = MonthNumDataWithout & MonthProdVol;

//// Графики по месяцам
// Точка графика по месяцу
export interface GraphPointMonth {
  name: 'Zt' | 'Zg';
  Tp: number;
  volumeStocks: number;
}
// Данные по паре и массив точек для нее
export interface GraphPairDataMonth {
  pair: string;
  data: GraphPointMonth[];
  maxМolumeStocks: number;
}
// Массив данных для графика для одного месяца по всем парам
export type GraphDataMonth = GraphPairDataMonth[];

//// Большие общие графики
// Точка графика большого
export interface GraphPointCommon {
  name: 'Zt' | 'Zg' | 'Zc';
  daysCount: number;
  volumeStocks: number;
}
// Точка графика большого
export type PairGraphPoints = GraphPointCommon[];

// Результаты расчета
export type ResultData = {
  // Все данные с наложением
  data_with: {
    // Большой общий график с
    common_graphs: {
      // все пары машин
      all_pairs: string[];
      // точки по всем парам с
      graph_all_months_with: PairGraphPoints[];
    };
    // Освоенный запас
    remaining_stock: number;
    // Числовые данные по месяцам с
    res_for_months: MonthDataWith[];
  };
  // Все данные без наложения
  data_without: {
    // Большой общий график без
    common_graphs: {
      // все пары машин
      all_pairs: string[];
      // точки по всем парам без
      graph_all_months_without: PairGraphPoints[];
    };
    // Освоенный запас
    remaining_stock: number;
    // Числовые данные по месяцам без
    res_for_months: MonthDataWithout[];
  };
  // Данные для графиков по каждому месяцу
  graphs_for_every_month: {
    graph_with: GraphDataMonth[];
    graph_without: GraphDataMonth[];
  };
  // Максимальное значение volume_stocks
  max_volume_stocks: number;
};

// Для вывода в таблицу
export interface RowTable {
  key: number,
  car: string;
  MainMarkCars: string;
  MainCountCars: number | "";
  MainCountShift: number | "";
  MainShiftProduction: number | "";
  AdditionalMarkCars: string;
  AdditionalCountCars: number | "";
  AdditionalCountShift: number | "";
  AdditionalShiftProduction: number | "";
}
