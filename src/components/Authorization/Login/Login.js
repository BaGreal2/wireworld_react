import React, { Component } from "react";
import { Link } from "react-router-dom";
import Topbar from "../../Topbar/Topbar";

import "../Authorization.css";

import dictionary from "../../../dictionary.json";
import { Button } from "../../MainPage";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
    };
    if (localStorage.getItem("language") === "ukr") {
      this.state.dict = dictionary.ukr;
    } else {
      this.state.dict = dictionary.eng;
    }
  }
  componentDidUpdate() {
    if (this.state.lang !== this.props.lang) {
      this.setState({
        lang: this.props.lang,
      });
    }
    if (this.state.lang === "ukr" && this.state.dict !== dictionary.ukr) {
      this.setState({
        dict: dictionary.ukr,
      });
    } else if (
      this.state.lang === "eng" &&
      this.state.dict !== dictionary.eng
    ) {
      this.setState({
        dict: dictionary.eng,
      });
    }
  }
  render() {
    return (
      <>
        <Topbar
          theme_func={this.props.toggleTheme}
          lang_func={this.props.toggleLang}
          needLang={true}
        ></Topbar>
        <div className="login">
          <h1 className="auth-title">{this.state.dict.login}</h1>
          <form className="auth-form">
            <div className="auth-input-container">
              <input
                className="auth-input"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Nickname"
                required
              ></input>
              <label className="auth-label">
                {this.state.dict.enter_nickname}
              </label>
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
              <label className="auth-label">
                {this.state.dict.enter_password}
              </label>
            </div>
            <div className="auth-buttons">
              <Link to="/main" style={{ textDecoration: "none" }}>
                <Button
                  id="sign_in"
                  classname={"main_buttons custom-btn"}
                  text={this.state.dict.sign_in}
                />
              </Link>
              <Link to="/registration" className="auth-redirect-link">
                <span id="redirect">{this.state.dict.dont_have_acc}</span>
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}
