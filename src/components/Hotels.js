import React from "react";
import "../styles/hotels.css";
import logo from "../img/house.png";
import { useDispatch } from "react-redux";
import { addItem, deleteItem } from "../redux/favorites";
import { changeSearchItemFav } from "../redux/searchResult";

function HotelItem({ data, icon }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(changeSearchItemFav({ id: data.id, isFav: !data.isFav }));
    if (data.isFav) dispatch(deleteItem(data.id));
    else dispatch(addItem(data));
  }

  return (
    <div className="hotel-item-block">
      {!!icon && icon}
      <div>Название: {data.hotelName}</div>
      <div>Рейтинг: {data.stars}</div>
      <div>Цена: {data.priceFrom}</div>
      <div>Заезд: {!!data.checkIn && data.checkIn}</div>
      <div>Длительность: {!!data.numberOfDays && data.numberOfDays}</div>
      <div>IsFav: {(!!data.isFav && 1) || 0}</div>
      <div>
        <FavButton handleClick={handleClick} data={data} />
      </div>
    </div>
  );
}

const HouseIco = () => {
  return (
    <div className="circle">
      <img scr={logo} alt="" />
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
      {(props.data.isFav && "Удалить") || `Выбрать`}
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
