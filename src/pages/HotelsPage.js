import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { SearchHotelsList, FavHotelsList } from "../components/Hotels";

import { logOut } from "../redux/user";
import { setSearchArr } from "../redux/searchResult";

import { useHttp } from "../hooks/useHttp";
import useQueryFormater from "../hooks/useQueryFormater";
import useDateToJSON from "../hooks/useMyDate";

import "../styles/root.css";

export function HotelsPage() {
  console.log("[HotelPage rerander]");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const searchRes = useSelector((state) => state.search);

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
    console.log("searchParams", searchParams);
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

  //   const completeData = (data) => {
  //     const date = convertDateToJSON(selectedDate);
  //     return data.map((item) => ({
  //       id: item.hotelId,
  //       hotelName: item.hotelName,
  //       stars: item.stars,
  //       priceFrom: item.priceFrom,
  //       checkIn: date,
  //       numberOfDays: searchParams.numberOfDays,
  //       isFav: false,
  //     }));
  //   };

  /* complete API data with UI data and check in Favorites Array*/
  const completeData = (data) => {
    const date = convertDateToJSON(selectedDate);
    return data.map((element) => {
      const matchingElement = favorites.favArray.find(
        (item) => element.hotelId === item.id
      );
      return {
        id: element.hotelId,
        hotelName: element.hotelName,
        stars: element.stars,
        priceFrom: element.priceFrom,
        checkIn: date,
        numberOfDays: element.numberOfDays,
        isFav: matchingElement,
      };
    });
  };

  //   const fetchHotelData = useCallback(async () => {
  //     try {
  //       console.log(searchParams);
  //       const queryStringSearchParams = await toQueryStringData(
  //         transformFormData(searchParams)
  //       );
  //       const fetched = await request(
  //         `http://engine.hotellook.com/api/v2/cache.json${queryStringSearchParams}`,
  //         "GET",
  //         null
  //       );
  //       console.log("fetched", fetched);
  //       dispatch(setSearchArr(completeData(fetched)));
  //     } catch (e) {
  //       console.log("ERROR GET data: ", e);
  //     }
  //   }, []);

  //   const handleSearchSubmit = (event) => {
  //     event.preventDefault();
  //     fetchHotelData();
  //   };

  //   useEffect(() => {
  //     fetchHotelData();
  //   }, [fetchHotelData]);

  const fetchHotelData = useCallback(async () => {
    try {
      console.log(searchParams);
      const queryStringSearchParams = await toQueryStringData(
        transformFormData(searchParams)
      );
      const fetched = await request(
        `http://engine.hotellook.com/api/v2/cache.json${queryStringSearchParams}`,
        "GET",
        null
      );
      console.log("fetched", fetched);
      dispatch(setSearchArr(completeData(fetched)));
    } catch (e) {
      console.log("ERROR GET data: ", e);
    }
  }, []);

  const handleSearchSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      console.log(searchParams);
      const queryStringSearchParams = await toQueryStringData(
        transformFormData(searchParams)
      );
      const fetched = await request(
        `http://engine.hotellook.com/api/v2/cache.json${queryStringSearchParams}`,
        "GET",
        null
      );
      console.log("fetched", fetched);
      dispatch(setSearchArr(completeData(fetched)));
    } catch (e) {
      console.log("ERROR GET data: ", e);
    }
  });

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

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
      <div className="two-column-layout">
        <SearchHotelsList loading={loading} data={searchRes.searchArray} />
        <FavHotelsList loading={loading} data={favorites.favArray} />
      </div>
    </div>
  );
}
