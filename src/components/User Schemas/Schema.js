import axios from "axios";
import React, { useState } from "react";

import RaitingStars from "./RaitingStars";
import { Link } from "react-router-dom";
import { Alert } from "../../shared/Alert";
import { DeleteIcon } from "../../svg";

import "../../config/axios";

function Schema(props) {
  const [error, setError] = useState(null);
  const deletePost = () => {
    let data = {
      userId: JSON.parse(JSON.parse(localStorage.getItem("persist:auth")).user)
        ._id,
    };
    axios({
      method: "DELETE",
      url: `/schemas/${props.id}`,
      data,
    })
      .then((res) => {
        props.updateList(!props.update);
      })
      .catch((error) => setError(error));
  };
  return (
    <div className="schemas-element">
      {error && (
        <Alert
          alertTitle={error.message}
          alertDescription={error.responce?.data.message}
          className="schema-alert"
        />
      )}
      <div className="schemas-element-sub">
        <div className="schema-text">
          <h2 className="schema-title">{props.title}</h2>
          <p className="schema-description">{props.description}</p>
        </div>
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
        {props.showDelete && <DeleteIcon onClick={deletePost} />}
      </div>
    </div>
  );
}

export default Schema;
