import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavHotelsList } from "./Hotels";
import { sortFavBy } from "../redux/favorites";

import "../styles/root.css";

export function FavElement(props) {
  const dispatch = useDispatch();
  const fav = useSelector((state) => state.favorites);

  const handleClick = (typeName) => {
    dispatch(
      sortFavBy({
        type: typeName,
        direct: typeName === fav.sortedBy.type ? !fav.sortedBy.direct : "true",
      })
    );
  };

  return (
    <div>
      <button onClick={() => handleClick("rate")}>Рейтинг</button>
      <button onClick={() => handleClick("price")}>Цена</button>
      <FavHotelsList loading={props.loading} data={props.data} />
    </div>
  );
}
