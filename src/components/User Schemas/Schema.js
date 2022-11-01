import React from "react";
import RaitingStars from "./RaitingStars";
import { Link } from "react-router-dom";

function Schema(props) {
  return (
    <div className="schemas-element">
      <div className="schemas-element-sub">
        <div className="schema-text">
          <h2 className="schema-title">{props.title}</h2>
          <p className="schema-description">{props.description}</p>
        </div>
        {/* /schemas/:id */}
        <Link
          to={"/schemas/" + props.id}
          className="schema-load-link"
          style={{ textDecoration: "none" }}
        >
          <button className="schema-load">▶</button>
        </Link>
      </div>
      <div className="creator-rating">
        <p className="schema-creator">By: {props.creator}</p>
        <RaitingStars ratingNum={props.rating}></RaitingStars>
      </div>
    </div>
  );
}

export default Schema;
