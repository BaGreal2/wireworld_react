import React, { Component } from "react";
import { Button } from "../../shared";
import { Link } from "react-router-dom";

export default class PostSchema extends Component {
  render() {
    return (
      <Link to="/post" className="auth-redirect-link">
        <Button
          id="post_schema"
          classname={"main_buttons custom-btn post-btn"}
          text={this.props.text}
        />
      </Link>
    );
  }
}
