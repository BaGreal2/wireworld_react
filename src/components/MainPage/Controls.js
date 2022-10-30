import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style/Controls.css";
import { Button } from "../../shared";
import { Dropdown } from "../../shared";

import dictionary from "../../dictionary.json";

export default class Controls extends Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem("language") === "ukr") {
      this.state = { dict: dictionary.ukr };
    } else {
      this.state = { dict: dictionary.eng };
    }
  }
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
      <div className="controls">
        <Button
          id={"start"}
          classname={"main_buttons custom-btn"}
          text={this.props.startLabel}
          action={this.props.toggleStart}
        ></Button>
        <Button
          id={"clear"}
          classname={"main_buttons custom-btn"}
          text={this.state.dict.clear}
          action={this.props.toggleClear}
        ></Button>
        <Button
          id={"reset"}
          classname={"main_buttons custom-btn"}
          text={this.state.dict.reset}
          action={this.props.toggleReset}
        ></Button>
        <Link to="/schemas" style={{ textDecoration: "none" }}>
          <Button
            id={"usr_levels"}
            classname={"main_buttons custom-btn"}
            text={this.state.dict.user_levels}
          ></Button>
        </Link>
        <Dropdown
          title={this.state.dict.pick_item}
          content={[
            { id: "empty", value: "0", text: this.state.dict.empty },
            { id: "head", value: "1", text: this.state.dict.head },
            { id: "tail", value: "2", text: this.state.dict.tail },
            { id: "conductor", value: "3", text: this.state.dict.conductor },
          ]}
          onItemChange={this.props.onValueChange}
          selected={
            parseInt(this.props.curr_click_value) === 0
              ? this.state.dict.empty
              : parseInt(this.props.curr_click_value) === 1
              ? this.state.dict.head
              : parseInt(this.props.curr_click_value) === 2
              ? this.state.dict.tail
              : parseInt(this.props.curr_click_value) === 3
              ? this.state.dict.conductor
              : this.state.dict.conductor
          }
        ></Dropdown>
        <Dropdown
          title={this.state.dict.pick_speed}
          content={[
            { id: "empty", value: "210", text: this.state.dict.slow },
            { id: "head", value: "100", text: this.state.dict.medium },
            { id: "tail", value: "30", text: this.state.dict.fast },
            { id: "conductor", value: "10", text: this.state.dict.unlimited },
          ]}
          onItemChange={this.props.onSpeedChange}
          selected={
            parseInt(this.props.reproductionTime) === 210
              ? this.state.dict.slow
              : parseInt(this.props.reproductionTime) === 100
              ? this.state.dict.medium
              : parseInt(this.props.reproductionTime) === 30
              ? this.state.dict.fast
              : parseInt(this.props.reproductionTime) === 10
              ? this.state.dict.unlimited
              : this.state.dict.medium
          }
        ></Dropdown>
        {/* <PostSchema text={""}>
          <UploadIcon />
        </PostSchema> */}
      </div>
    );
  }
}
