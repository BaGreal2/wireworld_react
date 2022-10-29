import React, { Component } from "react";
import { Topbar } from "../../shared";
import FormPostSchema from "./FormPostSchema";

import "./PostPage.css";

import dictionary from "../../dictionary.json";

export default class PostPage extends Component {
  constructor() {
    super();
    if (localStorage.getItem("language") === "ukr") {
      this.state = { dict: dictionary.ukr };
    } else {
      this.state = { dict: dictionary.eng };
    }
  }

  //-------COMPONENT CHANGES----------------

  componentDidUpdate() {
    if (this.props.lang === "ukr" && this.state.dict !== dictionary.ukr) {
      this.setState({
        dict: dictionary.ukr,
      });
    } else if (
      this.props.lang === "eng" &&
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
          needTitle={true}
          needLang={true}
        ></Topbar>
        <FormPostSchema
          title={this.state.dict.title}
          description={this.state.dict.description}
          post={this.state.dict.post}
        />
      </>
    );
  }
}
