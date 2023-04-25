import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SearchHotelsList } from "../components/Hotels";
import { FavElement } from "../components/favoriteElement";
import { TextField } from "../components/TextField";
import { Slider } from "../components/Slider";

import { logOut } from "../redux/user";
import { setSearchArr } from "../redux/searchResult";

import { useHttp } from "../hooks/useHttp";
import useQueryFormater from "../hooks/useQueryFormater";
import useDateToJSON from "../hooks/useMyDate";

import logo from "../img/logOut.png";
import img1 from "../img/Rectangle 23.png";
import img2 from "../img/Rectangle 24.png";
import img3 from "../img/Rectangle 28.png";
import { useRenderCounter } from "../hooks/useRenderCounter";
import { SearchForm } from "../components/SearchForm";

export function HotelsPage() {
  const render = useRenderCounter("HotelsPage");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const searchRes = useSelector((state) => state.search);

  const { request, loading } = useHttp();

  const {
    convertDateToJSON,
    nextDayAmount,
    formatDate,
    declinateDay,
  } = useDateToJSON();

  const { toQueryStringData } = useQueryFormater();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [curDay, setCurDay] = useState(new Date());
  const [location, setLocation] = useState("Москва");

  const [searchParams, setSearchParams] = useState({
    location: "Москва",
    numberOfDays: 1,
  });

  const transformFormData = (formData) => {
    return {
      location: formData.location,
      checkIn: convertDateToJSON(selectedDate),
      checkOut: convertDateToJSON(
        nextDayAmount(selectedDate, formData.numberOfDays)
      ),
      lang: "ru",
      limit: 100,
    };
  };

  /* complete API data with UI data and check in Favorites Array*/
  const completeData = (data, UIdata) => {
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
        numberOfDays: UIdata.numberOfDays,
        isFav: matchingElement,
      };
    });
  };

  const fetchHotelData = useCallback(async () => {
    try {
      const queryStringSearchParams = await toQueryStringData(
        transformFormData(searchParams)
      );
      const fetched = await request(
        `https://engine.hotellook.com/api/v2/cache.json${queryStringSearchParams}`,
        "GET",
        null
      );
      if (!!fetched && fetched.length > 0)
        setLocation(fetched[0].location.name);
      dispatch(setSearchArr(completeData(fetched, searchParams)));
      if (!!fetched && fetched.length > 0)
        setCurDay(convertDateToJSON(selectedDate));
    } catch (e) {
      console.log("ERROR GET data: ", e);
    }
  }, [searchParams, selectedDate]);

  const handleSearchSubmit = useCallback(async (searchPar, day) => {
    setSearchParams(searchPar);
    setSelectedDate(day);
  });

  useEffect(() => {
    fetchHotelData();
  }, [searchParams]);

  return (
    <div className="hotels-background">
      <div className="header-element">
        <span className="bold-text">Simple Hotel Check</span>
        <div className="row">
          {user.email}
          <button
            className="logout"
            aria-label="Log-Out"
            onClick={() => dispatch(logOut())}
          >
            <div>Выйти</div>
            <img src={logo} alt="Exit"></img>
          </button>
        </div>
      </div>
      <div className="content-container">
        <div className="left-column">
          <SearchForm
            searchParams={searchParams}
            loading={loading}
            handleSearchSubmit={handleSearchSubmit}
          />
          <div className="favorites-panel rounded-panel">
            <span className="bold-text">Избранное</span>
            <FavElement loading={loading} data={favorites.favArray} />
          </div>
        </div>
        <div className="rounded-panel right-column">
          <div className="saerch-res-header">
            <div className="location-info">
              <span>Отели</span>
              &gt;
              <span>{!!location && location}</span>
            </div>
            <span>{formatDate(curDay)}</span>
          </div>
          <Slider
            images={[
              { src: img1, alt: "image1", id: "1" },
              { src: img2, alt: "image2", id: "2" },
              { src: img3, alt: "image3", id: "3" },
              { src: img1, alt: "image1", id: "4" },
              { src: img2, alt: "image2", id: "5" },
              { src: img3, alt: "image3", id: "6" },
              { src: img1, alt: "image1", id: "7" },
              { src: img2, alt: "image2", id: "8" },
              { src: img3, alt: "image3", id: "9" },
            ]}
          />
          <div className="saerch-res-main">
            <div className="fav-info">
              Добавлено в Избранное:{" "}
              <span className="little-bold-text">
                {favorites.favArray.length}
              </span>{" "}
              {declinateDay(favorites.favArray.length, "отел")}
            </div>
            <div className="search-res-container scrollable-element">
              <SearchHotelsList
                loading={loading}
                data={searchRes.searchArray}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
