import React, { Component } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default class PostSchema extends Component {
  render() {
    return (
      <Link to="/post" className="auth-redirect-link post-link">
        <Button
          id="post_schema"
          classname={"custom-btn post-btn"}
          text={this.props.text}
          action={this.props.onClick}
        >
          {this.props.children}
        </Button>
      </Link>
    );
  }
}
