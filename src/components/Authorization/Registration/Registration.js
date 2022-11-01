import React, { useState, useEffect } from "react";
import { Alert } from "../../../shared/Alert";
import { Button } from "../../../shared";
import { Link } from "react-router-dom";
import { Topbar } from "../../../shared";

import { useDispatch, useSelector } from "react-redux";
import { authOperations, authSelectors } from "../../../redux/auth";

import "../Authorization.css";

import dictionary from "../../../dictionary.json";

export default function Registration({ lang, toggleTheme, toggleLang }) {
  const dispatch = useDispatch();
  function registration(data) {
    data.preventDefault();
    let username = data.target[0].value;
    let email = data.target[1].value;
    let password = data.target[2].value;
    let confirm_password = data.target[3].value;
    if (confirm_password !== password) {
      return;
    }
    let reg_obj = {
      email,
      username,
      password,
    };
    dispatch(authOperations.register(reg_obj));
  }

  const authError = useSelector(authSelectors.getError);
  let [dict, setDict] = useState(() => {
    if (localStorage.getItem("language") === "ukr") {
      return dictionary.ukr;
    } else {
      return dictionary.eng;
    }
  });

  //-------COMPONENT CHANGES----------------

  useEffect(() => {
    if (lang === "ukr" && dict !== dictionary.ukr) {
      setDict(dictionary.ukr);
    } else if (lang === "eng" && dict !== dictionary.eng) {
      setDict(dictionary.eng);
    }
  }, [lang, dict]);
  return (
    <>
      {authError && <Alert alertTitle="Error" alertDescription={authError} />}
      <Topbar
        theme_func={toggleTheme}
        lang_func={toggleLang}
        needLang={true}
      ></Topbar>
      <div className="registration">
        <h1 className="auth-title">{dict.registration}</h1>
        <form className="auth-form" onSubmit={registration} method="post">
          <div className="auth-input-container">
            <input
              className="auth-input"
              autoComplete="off"
              autoCorrect="off"
              placeholder="Nickname"
              required
            ></input>
            <label className="auth-label">{dict.enter_nickname}</label>
          </div>
          <div className="auth-input-container">
            <input
              className="auth-input"
              placeholder="Email"
              type="email"
              autoComplete="off"
              autoCorrect="off"
              required
            ></input>
            <label className="auth-label">{dict.enter_email}</label>
          </div>
          <div className="auth-input-container">
            <input
              className="auth-input"
              autoComplete="off"
              autoCorrect="off"
              placeholder="Password"
              type="password"
              required
            ></input>
            <label className="auth-label">{dict.enter_password}</label>
          </div>
          <div className="auth-input-container">
            <input
              className="auth-input"
              autoComplete="off"
              autoCorrect="off"
              placeholder="Confirm Password"
              type="password"
              required
            ></input>
            <label className="auth-label">{dict.confirm_password}</label>
          </div>
          <div className="auth-buttons">
            <Button
              id="sign_up"
              classname={"main_buttons custom-btn"}
              text={dict.sign_up}
              type="submit"
            />
            <Link to="/login" className="auth-redirect-link">
              <span id="redirect">{dict.have_acc}</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
