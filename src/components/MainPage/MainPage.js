import "../../App.css";
import React, { Component } from "react";

import { Grid } from "../../shared";
import Controls from "./Controls";
import { Topbar } from "../../shared";
import dictionary from "../../dictionary.json";

let rows = 55;
let cols = 55;
if (localStorage.getItem("rows") && localStorage.getItem("cols")) {
  rows = JSON.parse(localStorage.getItem("rows"));
  cols = JSON.parse(localStorage.getItem("cols"));
}
let grid = new Array(rows);
if (localStorage.getItem("grid")) {
  grid = JSON.parse(localStorage.getItem("grid"));
} else {
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
}

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_click_value: 3,
      speed: 100,
      mouseDown: 0,
      isStart: false,
      clearGrid: false,
      resetGrid: false,
      startLabel:
        localStorage.getItem("language") === "eng" ? "Start" : "Старт",
      theme: props.theme,
      dict: dictionary.eng,
    };
    if (localStorage.getItem("language") === "ukr") {
      this.state.startLabel =
        localStorage.getItem("language") === "eng" ? "Start" : "Старт";
    }

    document.body.onmousedown = () => {
      let updatedMouseDown = this.state.mouseDown + 1;
      this.setState({
        mouseDown: updatedMouseDown,
      });
    };
    document.body.onmouseup = () => {
      let updatedMouseDown = this.state.mouseDown - 1;
      this.setState({
        mouseDown: updatedMouseDown,
      });
    };
  }
  componentDidUpdate() {
    if (this.state.theme !== this.props.theme) {
      this.setState({
        theme: this.props.theme,
      });
    }
    if (this.props.lang === "ukr" && this.state.dict !== dictionary.ukr) {
      this.setState({
        dict: dictionary.ukr,
        startLabel: dictionary.ukr.start,
      });
    } else if (
      this.props.lang === "eng" &&
      this.state.dict !== dictionary.eng
    ) {
      this.setState({
        dict: dictionary.eng,
        startLabel: dictionary.eng.start,
      });
    }
  }
  changeClickSpeed = (value) => {
    this.setState({
      speed: value,
    });
  };
  changeClickValue = (value) => {
    this.setState({
      curr_click_value: value,
    });
  };
  toggleStart = () => {
    this.setState({
      isStart: !this.state.isStart,
    });
    this.changeStartLabel();
  };
  changeStartLabel = () => {
    if (this.state.isStart) {
      this.setState({
        startLabel: this.state.dict.continue,
      });
    } else {
      this.setState({
        startLabel: this.state.dict.pause,
      });
    }
  };
  toggleClear = () => {
    this.setState({
      isStart: false,
      clearGrid: !this.state.clearGrid,
    });
    this.setState({
      startLabel: this.state.dict.start,
    });
  };
  toggleReset = () => {
    this.setState({
      isStart: false,
      resetGrid: !this.state.resetGrid,
    });
    this.setState({
      startLabel: this.state.dict.start,
    });
  };

  gridBackup = (rows, cols, grid) => {};

  render() {
    return (
      <div>
        <Topbar
          theme_func={this.props.toggleTheme}
          lang_func={this.props.toggleLang}
          needTitle={true}
          needLang={true}
        ></Topbar>
        <Grid
          rows={rows}
          cols={cols}
          grid={grid}
          nextGrid={grid}
          curr_click_value={this.state.curr_click_value}
          reproductionTime={this.state.speed}
          mouseDown={this.state.mouseDown}
          isStart={this.state.isStart}
          clearGrid={this.state.clearGrid}
          resetGrid={this.state.resetGrid}
          toggleStart={this.toggleStart}
          toggleClear={this.toggleClear}
          toggleReset={this.toggleReset}
          theme={this.state.theme}
        ></Grid>
        <Controls
          onValueChange={this.changeClickValue}
          onSpeedChange={this.changeClickSpeed}
          curr_click_value={this.state.curr_click_value}
          reproductionTime={this.state.speed}
          toggleStart={this.toggleStart}
          toggleClear={this.toggleClear}
          toggleReset={this.toggleReset}
          startLabel={this.state.startLabel}
          lang={this.props.lang}
        ></Controls>
      </div>
    );
  }
}
