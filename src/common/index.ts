export const techSystem = [
  'В+Т+С+П',
  'В+С+Т+П',
  'В+С+Т+П',
  'В+Т+С+П',
  'В+Т+С',
  'В+Т+П',
  'ВСР+Т+П',
  'В+Т',
  'ВСР+Т',
  'ВТ+СР+П',
  'ВТ+СР',
  'ВТ+П',
];

export const calcMonthNames = (
  firstMonth: number,
  countMonth: number
): string[] => {
  const monthNames = [];
  for (let i = firstMonth; i < Number(countMonth) + Number(firstMonth); i++) {
    // Получение названия месяца на русском языке
    let monthName = new Date(2023, i - 1, 1).toLocaleString('ru', {
      month: 'long',
    });
    monthNames.push(monthName);
  }
  return monthNames;
};
