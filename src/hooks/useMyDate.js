export default function useDateToJSON() {
  //s

  const convertDateToJSON = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
  };

  const nextDayAmount = (dateObj, numbersOfDate = 1) => {
    const resDate = new Date();
    resDate.setDate(dateObj.getDate() + numbersOfDate);
    return resDate;
  };

  return { convertDateToJSON, nextDayAmount };
}
