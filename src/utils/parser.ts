export const parseMultipleIds = (ids: string) => {
  return ids.split(',').map(Number);
};
