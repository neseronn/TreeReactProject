export enum TECH_SYSTEM_ID {
    VTSP1 = 1,
    VSTP1,
    VSTP2,
    VTSP2,
    VTS,
    VTP,
    VSRTP,
    VT,
    VSRT,
    VTSRP,
    VTSR,
    'VT-P',
}

export enum TECH_SYSTEM_VAL {
    VTSP1 = 'В+Т+С+П',
    VSTP1 = 'В+С+Т+П',
    VSTP2 = 'В+С+Т+П',
    VTSP2 = 'В+Т+С+П',
    VTS = 'В+Т+С',
    VTP = 'В+Т+П',
    VSRTP = 'ВСР+Т+П',
    VT = 'В+Т',
    VSRT = 'ВСР+Т',
    VTSRP = 'ВТ+СР+П',
    VTSR = 'ВТ+СР',
    'VT-P' = 'ВТ+П',
}

export interface CommonData {
    CountMonth: number;
    FirstMonth: number;
    markCar: string;
    TotalStock: number;
    AvgStock: number;
    ZoneLength: number;
    ShiftsNumber: number;
    replaceableMachinePerfomance: number;
    TechSystem: TECH_SYSTEM_VAL;
    N: TECH_SYSTEM_ID;
}
