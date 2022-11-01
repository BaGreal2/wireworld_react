import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
} from "@chakra-ui/react";
import { Button } from "../../../shared";
import { Link } from "react-router-dom";
import { Topbar } from "../../../shared";

import { useDispatch, useSelector } from "react-redux";
import { authOperations, authSelectors } from "../../../redux/auth";

import "../Authorization.css";

import dictionary from "../../../dictionary.json";

export default function Login({ lang, toggleTheme, toggleLang }) {
  const dispatch = useDispatch();
  function login(data) {
    data.preventDefault();
    let username = data.target[0].value;
    let password = data.target[1].value;
    let reg_obj = {
      username,
      password,
    };
    console.log(JSON.stringify(reg_obj));
    dispatch(authOperations.login(reg_obj));
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
    <Container>
      {authError ? console.log(authError) : <></>}
      {authError && (
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}
      <Topbar
        theme_func={toggleTheme}
        lang_func={toggleLang}
        needLang={true}
      ></Topbar>
      <div className="login">
        <h1 className="auth-title">{dict.login}</h1>
        <form className="auth-form" onSubmit={login} method="post">
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
              autoComplete="off"
              autoCorrect="off"
              placeholder="Password"
              type="password"
              required
            ></input>
            <label className="auth-label">{dict.enter_password}</label>
          </div>
          <div className="auth-buttons">
            <Button
              id="sign_in"
              classname={"main_buttons custom-btn"}
              text={dict.sign_in}
              type="submit"
            />
            <Link to="/registration" className="auth-redirect-link">
              <span id="redirect">{dict.dont_have_acc}</span>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
