import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/user";
import { useHttp } from "../hooks/useHttp";
import useQueryFormater from "../hooks/useQueryFormater";
import useDateToJSON from "../hooks/useMyDate";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function HotelsPage() {
  console.log("[HotelPage rerander]");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { request, loading } = useHttp();

  const { convertDateToJSON, nextDayAmount } = useDateToJSON();

  const { toQueryStringData } = useQueryFormater();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [searchParams, setSearchParams] = useState({
    location: "Москва",
    numberOfDays: 1,
  });

  function handleSearchParamChange(event) {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [event.target.name]: event.target.value,
    }));
  }

  const transformFormData = (formData) => {
    return {
      location: formData.location,
      checkIn: convertDateToJSON(selectedDate),
      checkOut: convertDateToJSON(
        nextDayAmount(selectedDate, formData.numberOfDays)
      ),
      limit: 100,
    };
  };

  const handleSearchSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      const queryStringSearchParams = await toQueryStringData(
        transformFormData(searchParams)
      );
      console.log(queryStringSearchParams);
      const fetched = await request(
        `http://engine.hotellook.com/api/v2/cache.json${queryStringSearchParams}`,
        "GET",
        null
      );
      console.log("GET data: ", fetched);
    } catch (e) {
      console.log("ERROR GET data: ", e);
    }
  });

  return (
    <div>
      <div>{user.email}</div>
      <button aria-label="Log-Out" onClick={() => dispatch(logOut())}>
        logOut
      </button>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="location"
          value={searchParams.location}
          onChange={handleSearchParamChange}
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          maxDate={new Date("2023-12-31")}
        />
        <input
          type="text"
          name="numberOfDays"
          value={searchParams.numberOfDays}
          onChange={handleSearchParamChange}
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>
      {/* <div>{SearchResult}</div> */}
    </div>
  );
}
