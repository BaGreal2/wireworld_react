import React from "react";

function Button(props) {
  return (
    <>
      <button
        id={props.id}
        className={props.classname}
        onClick={props.action}
        type={props.type ? props.type : "button"}
      >
        {props.text ? <span>{props.text}</span> : <></>}
        {props.children ? props.children : <></>}
      </button>
    </>
  );
}

export default Button;
