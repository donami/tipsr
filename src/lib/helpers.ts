export const formatDate = (timestamp: string) => {
  const date = new Date(+timestamp);
  const formatted = new Intl.DateTimeFormat('en-GB').format(date);

  return formatted;
};
