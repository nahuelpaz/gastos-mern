
export const formatToArgentineDate = (isoDate) => {
  if (!isoDate) return "-";
  const datePart = isoDate.slice(0, 10);
  const parts = datePart.split("-");
  if (parts.length !== 3) return datePart;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const isDateInRange = (date, startDate, endDate) => {
  const expenseDate = new Date(date);
  if (startDate && expenseDate < new Date(startDate)) return false;
  if (endDate && expenseDate > new Date(endDate)) return false;
  return true;
};

export const isDateInMonth = (date, month) => {
  if (!month) return true;
  const expenseDate = new Date(date);
  const [year, monthNumber] = month.split("-");
  return (
    expenseDate.getFullYear() === parseInt(year, 10) &&
    expenseDate.getMonth() + 1 === parseInt(monthNumber, 10)
  );
};
