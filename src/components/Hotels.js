import React from "react";

// next impliment data formating
function HotelItem({ data }) {
  return <div>data</div>;
}

function HotelsList({ items }) {
  if (!items.length) {
    return (
      <div className="search-result-field">
        <p className="no-search-result">No search result</p>
      </div>
    );
  }
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{HotelItem(item)}</li>
      ))}
    </ul>
  );
}
