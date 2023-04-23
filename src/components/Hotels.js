import React from "react";
import "../styles/hotels.css";

import logo from "../img/house.png";
import likeActive from "../img/Vector.png";
import like from "../img/Vector-1.png";

import { useDispatch } from "react-redux";
import { addItem, deleteItem } from "../redux/favorites";
import { changeSearchItemFav } from "../redux/searchResult";

import useDateToJSON from "../hooks/useMyDate";

import { StarRating } from "../components/starsRate";

function HotelItem({ data, icon }) {
  const { formatDate, declinateDay } = useDateToJSON();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(changeSearchItemFav({ id: data.id, isFav: !data.isFav }));
    if (data.isFav) dispatch(deleteItem(data.id));
    else dispatch(addItem(data));
  }

  return (
    <div className="hotel-item-block">
      {!!icon && icon}
      <div className="main-hotel-item-container">
        <div className="hotel-item-layer">
          <div>{data.hotelName}</div>
          <div>
            <FavButton handleClick={handleClick} data={data} />
          </div>
        </div>
        <div className="hotel-item-layer">
          <div className="date-block">
            <div>{formatDate(data.checkIn)}</div>—
            <div>
              {data.numberOfDays} {declinateDay(data.numberOfDays, "дн")}
            </div>
          </div>
        </div>
        <div className="hotel-item-layer">
          <div>
            <StarRating rating={data.stars} />
          </div>
          <div className="price-block">
            <span>Price:</span>
            {data.priceFrom}$
          </div>
        </div>
      </div>
    </div>
  );
}

const HouseIco = () => {
  return (
    <div className="circle">
      <img src={logo} alt="home"></img>
    </div>
  );
};

// function handleClick() {
//     if (!activeStatus) props.handleAdd();
//     else props.handleDelete();
//     setActiveStatus(!activeStatus);
//   }

const FavButton = (props) => {
  return (
    <button onClick={props.handleClick}>
      {(props.data.isFav && <img src={likeActive} alt="Удалить"></img>) || (
        <img src={like} alt="Выбрать"></img>
      )}
    </button>
  );
};

function HotelsList(props) {
  if (props.loading) {
    return <div>Loading...</div>;
  }
  if (!props.data.length) {
    return (
      <div className="search-result-field">
        <p className="no-search-result">No search result</p>
      </div>
    );
  }
  return (
    <div className="search-result-field">
      <ul>
        {props.data.map((item) => (
          <li key={item.id}>
            <HotelItem data={item} icon={props.icon} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SearchHotelsList(props) {
  return (
    <HotelsList icon={<HouseIco />} loading={props.loading} data={props.data} />
  );
}

export function FavHotelsList(props) {
  return <HotelsList data={props.data} />;
}
