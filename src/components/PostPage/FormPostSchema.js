import React, { useState } from "react";
import { Button } from "../../shared";

export default function FormPostSchema(props) {
  const [description_value, setDescValue] = useState(0);
  const [title_value, setTitleValue] = useState(0);
  return (
    <>
      <form className="post-form">
        <img
          className="canvas-screenshot"
          src={localStorage.getItem("gridImg")}
          alt="img"
        ></img>
        <div className="auth-input-container post-title-container">
          <input
            className="auth-input post-title"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Title"
            maxLength={15}
            onChange={(elem) => setTitleValue(elem.target.value.length)}
            required
          ></input>
          <label className="auth-label">{props.title}</label>
          <span className="ch-remain">{title_value}/15</span>
        </div>
        <div className="auth-input-container post-desription-container">
          <textarea
            className="auth-input post-description"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Description"
            maxLength={90}
            onChange={(elem) => setDescValue(elem.target.value.length)}
            required
          ></textarea>
          <label className="auth-label">{props.description}</label>
          <span className="ch-remain">{description_value}/90</span>
        </div>
        <Button
          id="sign_in"
          classname={"main_buttons custom-btn"}
          text={props.post}
        />
      </form>
    </>
  );
}
