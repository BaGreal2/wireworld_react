import React, { Component } from "react";
import "./Topbar.css";

export default class Topbar extends Component {
  render() {
    return (
      <>
        <button
          id="switch"
          className="custom-btn btn-1"
          onClick={this.props.theme_func}
        ></button>
        <button
          id="switch_lang"
          className="custom-btn btn-1"
          onClick={this.props.lang_func}
        ></button>
        <h1 className="app-title">WireWorld</h1>
      </>
    );
  }
}
