import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const StarRating = ({ rating }) => {
  const filledStars = Number(rating);
  const unfilledStars = 5 - filledStars;
  const starStyle = { color: "#CDBC1E" };
  const emptyStarStyle = { color: "#6C6845" };

  const filledStar = <FontAwesomeIcon icon={faStar} style={starStyle} />;
  const emptyStar = <FontAwesomeIcon icon={faStar} style={emptyStarStyle} />;

  return (
    <div>
      {[...Array(filledStars)].map((x, i) => filledStar)}
      {[...Array(unfilledStars)].map((x, i) => emptyStar)}
    </div>
  );
};
