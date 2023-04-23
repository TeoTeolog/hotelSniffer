import { useMemo } from "react";

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
    const resDate = new Date(dateObj);
    resDate.setDate(dateObj.getDate() + Number(numbersOfDate));
    return resDate;
  };

  const formatDate = useMemo(() => {
    return (dateString) => {
      const date = new Date(dateString);
      const options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("ru-RU", options);
    };
  }, []);

  const declinateDay = useMemo(() => {
    return (number, word) => {
      let mod10 = number % 10;
      let mod100 = number % 100;

      if (mod10 === 1 && mod100 !== 11) {
        return word + "ь";
      } else if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
        return word + "я";
      } else {
        return word + "ей";
      }
    };
  }, []);

  return { convertDateToJSON, nextDayAmount, formatDate, declinateDay };
}
