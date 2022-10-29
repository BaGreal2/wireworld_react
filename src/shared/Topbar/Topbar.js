import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

export default class Topbar extends Component {
  render() {
    return (
      <>
        <div className="switches">
          <button
            id="switch"
            className="custom-btn btn-1"
            onClick={this.props.theme_func}
          ></button>
          {this.props.needLang ? (
            <button
              id="switch_lang"
              className="custom-btn btn-1"
              onClick={this.props.lang_func}
            ></button>
          ) : (
            <></>
          )}
        </div>
        {this.props.needTitle ? (
          <Link to="/main" style={{ textDecoration: "none" }}>
            <h1 className="app-title">WireWorld</h1>
          </Link>
        ) : (
          <></>
        )}
      </>
    );
  }
}
