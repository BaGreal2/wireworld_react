import "../../App.css";
import React, { Component } from "react";

import Grid from "./Grid";
import Controls from "./Controls";
import Topbar from "./Topbar";
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

function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.body.className = themeName;
}

(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }
})();

function setLanguage(lang) {
  localStorage.setItem("language", lang);
  document.body.id = lang;
}

(function () {
  if (localStorage.getItem("language") === "ukr") {
    setLanguage("ukr");
  } else {
    setLanguage("eng");
  }
})();

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("language") === "ukr") {
      this.state = {
        curr_click_value: 3,
        speed: 100,
        mouseDown: 0,
        isStart: false,
        clearGrid: false,
        resetGrid: false,
        startLabel:
          localStorage.getItem("language") === "eng" ? "Start" : "Старт",
        lang: props.lang,
        dict: dictionary.ukr,
      };
    } else {
      this.state = {
        curr_click_value: 3,
        speed: 100,
        mouseDown: 0,
        isStart: false,
        clearGrid: false,
        resetGrid: false,
        startLabel:
          localStorage.getItem("language") === "eng" ? "Start" : "Старт",
        lang: props.lang,
        dict: dictionary.eng,
      };
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
    if (this.state.lang !== this.props.lang) {
      this.setState({
        lang: this.props.lang,
      });
    }
    if (this.state.lang === "ukr" && this.state.dict !== dictionary.ukr) {
      this.setState({
        dict: dictionary.ukr,
        startLabel: dictionary.ukr.start,
      });
    } else if (
      this.state.lang === "eng" &&
      this.state.dict !== dictionary.eng
    ) {
      this.setState({
        dict: dictionary.eng,
        startLabel: dictionary.eng.start,
      });
    }
  }
  toggleTheme = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
    } else {
      setTheme("theme-dark");
    }
  };
  toggleLanguage = () => {
    if (localStorage.getItem("language") === "eng") {
      setLanguage("ukr");
    } else {
      setLanguage("eng");
    }
    this.props.toggleLang();
  };
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
  render() {
    return (
      <div>
        <Topbar
          theme_func={this.toggleTheme}
          lang_func={this.toggleLanguage}
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
          lang={this.state.lang}
        ></Controls>
      </div>
    );
  }
}
