import React from "react";

import "./styles/RaitingStars.css";

export default function RaitingStars(props) {
  const percentageWidth = Math.round((((props.ratingNum / 5) * 100) / 10) * 10);
  return (
    <div className="rating-wrapper">
      <div className="stars-outer">
        <div
          className="stars-inner"
          style={{ width: `${percentageWidth}%` }}
        ></div>
      </div>
      <div className="stars-number">
        {Math.round(props.ratingNum * 10) / 10}
      </div>
    </div>
  );
}
