export const isNotEmpty = (value?: string | null) =>
    Boolean(value && value !== "undefined" && value != null); 

export const getTodayFormatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day} 23:59:59`;
}; 

export const getLastWeekFormatDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day} 00:00:00`;
};