import React, { Component } from "react";
import "./Controls.css";
import Button from "./Button";
import Dropdown from "./Dropdown";

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curr_click_value: props.curr_click_value,
      reproductionTime: props.reproductionTime,
      toggleStart: props.toggleStart,
      toggleClear: props.toggleClear,
      startLabel: props.startLabel,
    };
  }
  componentDidUpdate() {
    if (
      this.state.curr_click_value !== this.props.curr_click_value ||
      this.state.reproductionTime !== this.props.reproductionTime ||
      this.state.toggleStart !== this.props.toggleStart ||
      this.state.toggleClear !== this.props.toggleClear ||
      this.state.startLabel !== this.props.startLabel
    ) {
      this.setState({
        curr_click_value: this.props.curr_click_value,
        reproductionTime: this.props.reproductionTime,
        toggleStart: this.props.toggleStart,
        startLabel: this.props.startLabel,
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
          text={"Clear"}
          action={this.state.toggleClear}
        ></Button>
        <Button
          id={"usr_levels"}
          classname={"main_buttons custom-btn"}
          text={"User Levels"}
        ></Button>
        <Dropdown
          title={"Pick Item"}
          content={[
            { id: "empty", value: "0", text: "Empty" },
            { id: "head", value: "1", text: "Head" },
            { id: "tail", value: "2", text: "Tail" },
            { id: "conductor", value: "3", text: "Conductor" },
          ]}
          onItemChange={this.props.onValueChange}
          selected={
            parseInt(this.state.curr_click_value) === 0
              ? "Empty"
              : parseInt(this.state.curr_click_value) === 1
              ? "Head"
              : parseInt(this.state.curr_click_value) === 2
              ? "Tail"
              : parseInt(this.state.curr_click_value) === 3
              ? "Conductor"
              : "Conductor"
          }
        ></Dropdown>
        <Dropdown
          title={"Pick Speed"}
          content={[
            { id: "empty", value: "210", text: "Slow" },
            { id: "head", value: "100", text: "Medium" },
            { id: "tail", value: "30", text: "Fast" },
            { id: "conductor", value: "10", text: "Unlimited" },
          ]}
          onItemChange={this.props.onSpeedChange}
          selected={
            parseInt(this.state.reproductionTime) === 210
              ? "Slow"
              : parseInt(this.state.reproductionTime) === 100
              ? "Medium"
              : parseInt(this.state.reproductionTime) === 30
              ? "Fast"
              : parseInt(this.state.reproductionTime) === 10
              ? "Unlimited"
              : "Medium"
          }
        ></Dropdown>
      </div>
    );
  }
}
