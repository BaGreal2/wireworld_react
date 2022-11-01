import React from "react";
import { Button } from "../../../shared";
import { Link } from "react-router-dom";

import "../Authorization.css";

export default function Logout({ text, onClick, children }) {
  return (
    <Link to="/login" className="auth-redirect-link">
      <Button
        id="logout"
        classname={"custom-btn logout-btn"}
        text={text}
        action={onClick}
      >
        {children}
      </Button>
    </Link>
  );
}
