import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useRenderCounter } from "../hooks/useRenderCounter";
import { TextField } from "./TextField";

export const SearchForm = (props) => {
  const render = useRenderCounter("SearchForm");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchParams, setSearchParams] = useState(props.searchParams);

  function handleSearchParamChange(event) {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="search-panel rounded-panel">
      <TextField
        type="text"
        name="location"
        lable="Локация"
        value={searchParams.location}
        onChange={handleSearchParamChange}
      />
      <label>Дата заселения</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        maxDate={new Date("2025-12-31")}
      />
      <TextField
        lable="Количество дней"
        type="text"
        name="numberOfDays"
        value={searchParams.numberOfDays}
        onChange={handleSearchParamChange}
      />
      <button
        type="submit"
        disabled={props.loading}
        onClick={() => {
          props.handleSearchSubmit(searchParams, selectedDate);
        }}
        className="button"
      >
        Найти
      </button>
    </div>
  );
};
