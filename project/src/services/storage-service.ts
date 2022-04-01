export const getItem = (key: string): string => {
  const item = localStorage.getItem(key);
  return item ?? '';
};

export const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
