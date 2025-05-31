export const dayjsFormat = 'YYYY-MM-DD HH:mm:ss';

export const startOfDay = (date, format?: string) => {
  return date.startOf('day').format(format || dayjsFormat);
};

export const endOfDay = (date, format?: string) => {
  return date.endOf('day').format(format || dayjsFormat);
};

// TODO use dayjs
export const today = () => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const date = String(dateObj.getUTCDate());
  const year = String(dateObj.getUTCFullYear());
  return `${year}-${`0${month}`.slice(-2)}-${`0${date}`.slice(-2)}`;
};
