import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRenderCounter } from "../hooks/useRenderCounter";

export const StarRating = (props) => {
  const { rating, id } = props;
  const filledStars = Number(rating);
  const unfilledStars = 5 - filledStars;
  const starStyle = { color: "#CDBC1E" };
  const emptyStarStyle = { color: "#6C6845" };

  return (
    <div>
      {[...Array(filledStars)].map((x, i) => (
        <FontAwesomeIcon
          key={id.toString() + i}
          icon={faStar}
          style={starStyle}
        />
      ))}
      {[...Array(unfilledStars)].map((x, i) => (
        <FontAwesomeIcon
          key={id.toString() + i + filledStars}
          icon={faStar}
          style={emptyStarStyle}
        />
      ))}
    </div>
  );
};
