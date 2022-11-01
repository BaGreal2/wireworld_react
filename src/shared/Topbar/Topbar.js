import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

export default function Topbar({
  theme_func,
  lang_func,
  needTitle = false,
  needLang = false,
}) {
  return (
    <>
      <div className="switches">
        <button
          id="switch"
          className="custom-btn btn-1"
          onClick={theme_func}
        ></button>
        {needLang ? (
          <button
            id="switch_lang"
            className="custom-btn btn-1"
            onClick={lang_func}
          ></button>
        ) : (
          <></>
        )}
      </div>
      {needTitle ? (
        <Link to="/main" style={{ textDecoration: "none" }}>
          <h1 className="app-title">WireWorld</h1>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
