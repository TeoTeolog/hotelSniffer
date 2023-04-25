import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SearchHotelsList } from "../components/Hotels";
import { FavElement } from "../components/favoriteElement";
import { Slider } from "../components/Slider";

import { logOut } from "../redux/user";

import { useHttp } from "../hooks/useHttp";
import useDateToJSON from "../hooks/useMyDate";

import logo from "../img/logOut.png";
import img1 from "../img/Rectangle 23.png";
import img2 from "../img/Rectangle 24.png";
import img3 from "../img/Rectangle 28.png";
import { useRenderCounter } from "../hooks/useRenderCounter";
import { SearchForm } from "../components/SearchForm";
import { useSearch } from "../hooks/useSearch";

export function HotelsPage() {
  const render = useRenderCounter("HotelsPage");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const searchRes = useSelector((state) => state.search);

  const { loading } = useHttp();

  const { fetchHotelData } = useSearch();

  const { formatDate, declinateDay } = useDateToJSON();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [searchParams, setSearchParams] = useState({
    location: "Москва",
    numberOfDays: 1,
  });

  const handleSearchSubmit = useCallback(async (searchPar, day) => {
    setSearchParams(searchPar);
    setSelectedDate(day);
  });

  useEffect(() => {
    fetchHotelData({ ...searchParams, selectedDate: selectedDate });
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
          <div className="search-panel rounded-panel">
            <SearchForm
              searchParams={searchParams}
              loading={loading}
              handleSearchSubmit={handleSearchSubmit}
            />
          </div>
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
              <span>
                {!!searchRes.searchLocation && searchRes.searchLocation}
              </span>
            </div>
            <span>{formatDate(searchRes.searchDate)}</span>
          </div>
          <Slider
            images={[
              { src: img1, alt: "image1", id: "1" },
              { src: img2, alt: "image2", id: "2" },
              { src: img3, alt: "image3", id: "3" },
              { src: img1, alt: "image1", id: "4" },
              { src: img2, alt: "image2", id: "5" },
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
