export const checkEmptyProperties = (array, minIndex?: number) => {
  const result = [];
  const currentMinIndex = minIndex ?? 0;
  array.forEach((obj, index) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (Array.isArray(value) && value.length === 0) {
            result.push(`index ${index} ${key} empty`);
            result.push(`${key} at line ${index + currentMinIndex} is invalid`);
          } else if (!value) {
            result.push(`${key} at line ${index + currentMinIndex} is invalid`);
          }
        }
      }
    }
  });

  return result;
};
