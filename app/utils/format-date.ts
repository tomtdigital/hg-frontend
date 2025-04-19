export const formatDate = (date: string): string => {
  const initial = new Date(date);
  const day = initial.getDate();
  const month = initial.getMonth() + 1;
  const year = initial.getFullYear();
  return `${day}/${month}/${year}`;
};
