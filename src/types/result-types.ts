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

// Вычисленные данные по месяцам
export interface MonthData {
  production_volume: ProductionVolume;
  about_additional_work_with: Pair[];
  about_additional_work_without: Pair[];
}

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
}
// Массив данных для графика для одного месяца по парам
export type GraphDataMonth = GraphPointMonth[];

//// Большие общие графики
// Точка графика большого
export interface GraphPointCommon {
  name: 'Zt' | 'Zg' | 'Zc';
  daysCount: number;
  volumeStocks: number;
}
// Точка графика большого
export type PairGraphPoints = GraphPointCommon[];

// Результаты
export type ResultData = {
  // Числовые данные по месяцам
  res_for_months: MonthData[];
  // Большие общие графики
  common_graphs: {
    // все пары машин
    all_pairs: string[];
    // точки по всем парам
    graph_all_months_with: PairGraphPoints[];
    graph_all_months_without: PairGraphPoints[];
  };
  // Освоенный запас
  remaining_stock: number;
  // Данные для графиков по каждому месяцу
  graphs_for_every_month: {
    graph_with: GraphDataMonth[];
    graph_without: GraphDataMonth[];
  };
};

// Для вывода в таблицу
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
