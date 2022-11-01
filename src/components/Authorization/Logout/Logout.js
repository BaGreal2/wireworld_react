import React, { useState, useEffect } from "react";
import { Button } from "../../../shared";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../redux/auth";

import "../Authorization.css";

export default function Logout({ text, onClick, children }) {
  const dispatch = useDispatch();

  function logout() {
    dispatch(authActions.logout());
  }
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
