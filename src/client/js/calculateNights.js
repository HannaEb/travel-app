// Calculate number of nights
const calcNights = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
  return days;
};

export { calcNights };
