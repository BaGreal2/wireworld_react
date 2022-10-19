import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style/Controls.css";
import Button from "./Button";
import Dropdown from "./Dropdown";
import dictionary from "../../dictionary.json";

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curr_click_value: props.curr_click_value,
      reproductionTime: props.reproductionTime,
      toggleStart: props.toggleStart,
      toggleClear: props.toggleClear,
      toggleReset: props.toggleReset,
      startLabel: props.startLabel,
      lang: props.lang,
    };
    if (localStorage.getItem("language") === "ukr") {
      this.state.dict = dictionary.ukr;
    } else {
      this.state.dict = dictionary.eng;
    }
  }
  componentDidUpdate() {
    if (
      this.state.curr_click_value !== this.props.curr_click_value ||
      this.state.reproductionTime !== this.props.reproductionTime ||
      this.state.toggleStart !== this.props.toggleStart ||
      this.state.toggleClear !== this.props.toggleClear ||
      this.state.startLabel !== this.props.startLabel ||
      this.state.lang !== this.props.lang
    ) {
      this.setState({
        curr_click_value: this.props.curr_click_value,
        reproductionTime: this.props.reproductionTime,
        toggleStart: this.props.toggleStart,
        toggleClear: this.props.toggleClear,
        startLabel: this.props.startLabel,
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
      <div className="controls">
        <Button
          id={"start"}
          classname={"main_buttons custom-btn"}
          text={this.state.startLabel}
          action={this.state.toggleStart}
        ></Button>
        <Button
          id={"clear"}
          classname={"main_buttons custom-btn"}
          text={this.state.dict.clear}
          action={this.state.toggleClear}
        ></Button>
        <Button
          id={"reset"}
          classname={"main_buttons custom-btn"}
          text={this.state.dict.reset}
          action={this.state.toggleReset}
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
            parseInt(this.state.curr_click_value) === 0
              ? this.state.dict.empty
              : parseInt(this.state.curr_click_value) === 1
              ? this.state.dict.head
              : parseInt(this.state.curr_click_value) === 2
              ? this.state.dict.tail
              : parseInt(this.state.curr_click_value) === 3
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
            parseInt(this.state.reproductionTime) === 210
              ? this.state.dict.slow
              : parseInt(this.state.reproductionTime) === 100
              ? this.state.dict.medium
              : parseInt(this.state.reproductionTime) === 30
              ? this.state.dict.fast
              : parseInt(this.state.reproductionTime) === 10
              ? this.state.dict.unlimited
              : this.state.dict.medium
          }
        ></Dropdown>
      </div>
    );
  }
}
