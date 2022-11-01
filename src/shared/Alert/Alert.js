import React from "react";
import { AlertIcon } from "../../svg";

import "./Alert.css";

export default function Alert({
  alertTitle,
  alertDescription,
  className = "",
}) {
  return (
    <div className={"alert-container " + className}>
      <div className="alert-icon-wrapper">
        <AlertIcon className="alert-icon" />
      </div>
      <div className="alert-text-wrapper">
        <h1 className="alert-title">{alertTitle}</h1>
        <p className="alert-description">{alertDescription}</p>
      </div>
    </div>
  );
}
