import "./App.css";
import React, { Component } from "react";

import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Topbar from "./components/Topbar";

const rows = 55;
const cols = 55;
let grid = [];

for (let i = 0; i < rows; i++) {
  grid[i] = new Array(cols);
}

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    grid[i][j] = 0;
  }
}

function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.body.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}

(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }
})();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curr_click_value: 3,
      speed: 100,
      mouseDown: 0,
      isStart: false,
      clearGrid: false,
      startLabel: "Start",
    };
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
        startLabel: "Continue",
      });
    } else {
      this.setState({
        startLabel: "Pause",
      });
    }
  };
  toggleClear = () => {
    this.setState({
      isStart: false,
      clearGrid: !this.state.clearGrid,
    });
    this.setState({
      startLabel: "Start",
    });
  };
  render() {
    return (
      <div>
        <Topbar theme_func={toggleTheme}></Topbar>
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
          toggleStart={this.toggleStart}
          toggleClear={this.toggleClear}
        ></Grid>
        <Controls
          onValueChange={this.changeClickValue}
          onSpeedChange={this.changeClickSpeed}
          curr_click_value={this.state.curr_click_value}
          reproductionTime={this.state.speed}
          toggleStart={this.toggleStart}
          toggleClear={this.toggleClear}
          startLabel={this.state.startLabel}
        ></Controls>
      </div>
    );
  }
}
