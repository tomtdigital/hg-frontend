export const formatDate = (date: string) => {
  const initial = new Date(date);
  const day = initial.getDate();
  const month = initial.getDate();
  const year = initial.getFullYear();
  return `${day}/${month}/${year}`;
};
