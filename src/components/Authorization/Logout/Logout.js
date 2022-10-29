import React, { Component } from "react";
import { Button } from "../../../shared";
import { Link } from "react-router-dom";

import "../Authorization.css";

export default class Logout extends Component {
  render() {
    return (
      <Link to="/login" className="auth-redirect-link">
        <Button
          id="logout"
          classname={"custom-btn logout-btn"}
          text={this.props.text}
        >
          {this.props.children}
        </Button>
      </Link>
    );
  }
}
