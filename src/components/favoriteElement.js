import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavHotelsList } from "./Hotels";
import { sortFavBy } from "../redux/favorites";

import "../styles/root.css";

export function FavElement(props) {
  const dispatch = useDispatch();
  const fav = useSelector((state) => state.favorites);
  const [sortOrder, setSortOrder] = useState(false);
  const [sortBy, setSortBy] = useState("rate");

  const handleClick = (typeName) => {
    dispatch(
      sortFavBy({
        type: typeName,
        direct: typeName === fav.sortedBy.type ? !fav.sortedBy.direct : "true",
      })
    );
    setSortBy(typeName);
    setSortOrder(
      typeName === fav.sortedBy.type ? !fav.sortedBy.direct : "true"
    );
  };

  return (
    <div className="contianer">
      <div className="sort-buttons">
        <button
          className={sortBy === "rate" ? "sort-active" : ""}
          onClick={() => handleClick("rate")}
        >
          Рейтинг
          <div className="arrow-box">
            <span
              className={`sort-arrow up ${
                sortBy === "rate" && sortOrder ? "sort-active" : ""
              }`}
            ></span>
            <span
              className={`sort-arrow down ${
                sortBy === "rate" && !sortOrder ? "sort-active" : ""
              }`}
            ></span>
          </div>
        </button>
        <button
          className={sortBy === "price" ? "sort-active" : ""}
          onClick={() => handleClick("price")}
        >
          Цена
          <div className="arrow-box">
            <span
              className={`sort-arrow up ${
                sortBy === "price" && sortOrder ? "sort-active" : ""
              }`}
            ></span>
            <span
              className={`sort-arrow down ${
                sortBy === "price" && !sortOrder ? "sort-active" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>
      <div className="favorites-list-container scrollable-element">
        <FavHotelsList loading={props.loading} data={props.data} />
      </div>
    </div>
  );
}
