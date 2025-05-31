type CalculatorProps = {
  value: number;
  total: number;
  toFixed?: number;
};

export const calculatePercentage = ({
  value,
  total,
  toFixed = 2,
}: CalculatorProps) => {
  if (!total || total === 0 || !value || value === 0) {
    return 0;
  }
  return +((value / total) * 100).toFixed(toFixed);
};
