import React, { Component } from "react";
import "./style/Grid.css";

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: props.rows,
      cols: props.cols,
      grid: props.grid,
      curr_click_value: props.curr_click_value,
      reproductionTime: props.reproductionTime,
      mouseDown: props.mouseDown,
      isStart: props.isStart,
      clearGrid: props.clearGrid,
      resetGrid: props.resetGrid,
      toggleClear: props.toggleClear,
      toggleReset: props.toggleReset,
      toggleStart: props.toggleStart,
    };
    this.nextGrid = JSON.parse(JSON.stringify(this.state.grid));
    this.timer = 0;
  }

  componentDidMount() {
    if (
      this.state.grid !== this.props.grid ||
      this.state.curr_click_value !== this.props.curr_click_value ||
      this.state.reproductionTime !== this.props.reproductionTime ||
      this.state.mouseDown !== this.props.mouseDown ||
      this.state.isStart !== this.props.isStart ||
      this.state.clearGrid !== this.props.clearGrid ||
      this.state.resetGrid !== this.props.resetGrid
    ) {
      this.setState({
        grid: this.props.grid,
        curr_click_value: this.props.curr_click_value,
        reproductionTime: this.props.reproductionTime,
        mouseDown: this.props.mouseDown,
        isStart: this.props.isStart,
        clearGrid: this.props.clearGrid,
        resetGrid: this.props.resetGrid,
      });
    }
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("grid", JSON.stringify(this.state.grid));
      localStorage.setItem("rows", JSON.stringify(this.state.rows));
      localStorage.setItem("cols", JSON.stringify(this.state.cols));
    });
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = 0;
    window.removeEventListener("beforeunload", () => {
      localStorage.setItem("grid", JSON.stringify(this.state.grid));
      localStorage.setItem("rows", JSON.stringify(this.state.rows));
      localStorage.setItem("cols", JSON.stringify(this.state.cols));
    });
  }
  componentDidUpdate() {
    if (this.state.reproductionTime !== this.props.reproductionTime) {
      clearInterval(this.timer);
      this.timer = 0;
      this.timer = setInterval(this.play, this.props.reproductionTime);
      this.setState({
        reproductionTime: this.props.reproductionTime,
      });
    }
    if (
      this.state.curr_click_value !== this.props.curr_click_value ||
      this.state.mouseDown !== this.props.mouseDown ||
      this.state.isStart !== this.props.isStart ||
      this.state.clearGrid !== this.props.clearGrid ||
      this.state.resetGrid !== this.props.resetGrid
    ) {
      this.setState({
        curr_click_value: this.props.curr_click_value,
        mouseDown: this.props.mouseDown,
        isStart: this.props.isStart,
        clearGrid: this.props.clearGrid,
        resetGrid: this.props.resetGrid,
      });
    }

    if (this.state.isStart && this.timer === 0) {
      this.timer = setInterval(this.play, this.state.reproductionTime);
    } else if (!this.state.isStart && this.timer !== 0) {
      clearInterval(this.timer);
      this.timer = 0;
    }
    if (this.state.clearGrid) {
      this.clearGrids();
      this.state.toggleClear();
      this.setState({
        clearGrid: false,
      });
    }
    if (this.state.resetGrid) {
      this.clearGrids();
      this.setState({
        rows: 55,
        cols: 55,
      });
      let saveGrid = new Array(55);
      this.nextGrid = new Array(55);
      for (let i = 0; i < 55; i++) {
        this.nextGrid[i] = new Array(55);
        saveGrid[i] = new Array(55);
      }
      for (let i = 0; i < 55; i++) {
        for (let j = 0; j < 55; j++) {
          saveGrid[i][j] = 0;
          this.nextGrid[i][j] = 0;
        }
      }
      this.setState({
        grid: JSON.parse(JSON.stringify(saveGrid)),
      });
      this.state.toggleReset();
      this.setState({
        resetGrid: false,
      });
    }
  }
  copyAndResetGrid = () => {
    let saveGrid = JSON.parse(JSON.stringify(this.nextGrid));

    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.cols; j++) {
        this.nextGrid[i][j] = 0;
      }
    }
    this.setState({
      grid: saveGrid,
    });
  };
  countNeighbors = (row, col) => {
    let count = 0;
    if (row - 1 >= 0) {
      if (this.state.grid[row - 1][col] === 1) count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
      if (this.state.grid[row - 1][col - 1] === 1) count++;
    }
    if (row - 1 >= 0 && col + 1 < this.state.cols) {
      if (this.state.grid[row - 1][col + 1] === 1) count++;
    }
    if (col - 1 >= 0) {
      if (this.state.grid[row][col - 1] === 1) count++;
    }
    if (col + 1 < this.state.cols) {
      if (this.state.grid[row][col + 1] === 1) count++;
    }
    if (row + 1 < this.state.rows) {
      if (this.state.grid[row + 1][col] === 1) count++;
    }
    if (row + 1 < this.state.rows && col - 1 >= 0) {
      if (this.state.grid[row + 1][col - 1] === 1) count++;
    }
    if (row + 1 < this.state.rows && col + 1 < this.state.cols) {
      if (this.state.grid[row + 1][col + 1] === 1) count++;
    }
    return count;
  };

  applyRules = (row, col) => {
    let numNeighbors = this.countNeighbors(row, col);

    if (this.state.grid[row][col] === 1) {
      this.nextGrid[row][col] = 2;
    } else if (this.state.grid[row][col] === 2) {
      this.nextGrid[row][col] = 3;
    } else if (this.state.grid[row][col] === 3) {
      if (numNeighbors === 2 || numNeighbors === 1) {
        this.nextGrid[row][col] = 1;
      } else {
        this.nextGrid[row][col] = 3;
      }
    }
  };
  play = () => {
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.cols; j++) {
        this.applyRules(i, j);
      }
    }
    this.copyAndResetGrid();
  };

  changeCellState = (row, col) => {
    let newGrid = JSON.parse(JSON.stringify(this.state.grid));
    newGrid[row][col] = parseInt(this.state.curr_click_value);
    this.setState({
      grid: JSON.parse(JSON.stringify(newGrid)),
    });
    return;
  };

  clearGrids = () => {
    let saveGrid = JSON.parse(JSON.stringify(this.state.grid));
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.cols; j++) {
        saveGrid[i][j] = 0;
        this.nextGrid[i][j] = 0;
      }
    }

    this.setState({
      grid: saveGrid,
    });
  };
  changeGridRes = (value) => {
    let valueInt = parseInt(value);
    if (valueInt >= 9 && valueInt <= 99) {
      this.setState({
        rows: valueInt,
        cols: valueInt,
      });
      if (this.state.isStart) {
        this.state.toggleStart();
      }
      let saveNotResizedGrid = JSON.parse(JSON.stringify(this.state.grid));
      let saveGrid = new Array(valueInt);
      this.nextGrid = new Array(valueInt);
      for (let i = 0; i < valueInt; i++) {
        this.nextGrid[i] = new Array(valueInt);
        saveGrid[i] = new Array(valueInt);
      }
      for (let i = 0; i < valueInt; i++) {
        for (let j = 0; j < valueInt; j++) {
          saveGrid[i][j] =
            saveNotResizedGrid[i] !== undefined ? saveNotResizedGrid[i][j] : 0;
          this.nextGrid[i][j] = 0;
        }
      }
      this.setState({
        grid: JSON.parse(JSON.stringify(saveGrid)),
      });
    } else {
      this.setState({
        rows: this.state.rows,
        cols: this.state.cols,
      });
    }
  };
  incGridRes = () => {
    let valueInt = this.state.rows + 1;
    if (valueInt >= 9 && valueInt <= 99) {
      this.setState({
        rows: valueInt,
        cols: valueInt,
      });
      if (this.state.isStart) {
        this.state.toggleStart();
      }
      let saveNotResizedGrid = JSON.parse(JSON.stringify(this.state.grid));
      let saveGrid = new Array(valueInt);
      this.nextGrid = new Array(valueInt);
      for (let i = 0; i < valueInt; i++) {
        this.nextGrid[i] = new Array(valueInt);
        saveGrid[i] = new Array(valueInt);
      }
      for (let i = 0; i < valueInt; i++) {
        for (let j = 0; j < valueInt; j++) {
          saveGrid[i][j] =
            saveNotResizedGrid[i] !== undefined ? saveNotResizedGrid[i][j] : 0;
          this.nextGrid[i][j] = 0;
        }
      }

      this.setState({
        grid: JSON.parse(JSON.stringify(saveGrid)),
      });
    } else {
      this.setState({
        rows: this.state.rows,
        cols: this.state.cols,
      });
    }
  };
  decGridRes = () => {
    let valueInt = this.state.rows - 1;
    if (valueInt >= 9 && valueInt <= 99) {
      this.setState({
        rows: valueInt,
        cols: valueInt,
      });
      if (this.state.isStart) {
        this.state.toggleStart();
      }
      let saveNotResizedGrid = JSON.parse(JSON.stringify(this.state.grid));
      let saveGrid = new Array(valueInt);
      this.nextGrid = new Array(valueInt);
      for (let i = 0; i < valueInt; i++) {
        this.nextGrid[i] = new Array(valueInt);
        saveGrid[i] = new Array(valueInt);
      }
      for (let i = 0; i < valueInt; i++) {
        for (let j = 0; j < valueInt; j++) {
          saveGrid[i][j] =
            saveNotResizedGrid[i] !== undefined ? saveNotResizedGrid[i][j] : 0;
          this.nextGrid[i][j] = 0;
        }
      }
      this.setState({
        grid: JSON.parse(JSON.stringify(saveGrid)),
      });
    } else {
      this.setState({
        rows: this.state.rows,
        cols: this.state.cols,
      });
    }
  };
  render() {
    return (
      <div className="gridMainContainer">
        <div className="container-res">
          <input
            type="number"
            min="9"
            max="99"
            value={this.state.rows}
            onChange={(e) => {
              e.preventDefault();
              this.changeGridRes(e.target.value);
            }}
            className="input-resolution"
          ></input>
          <p className="cross-res">x</p>
          <input
            type="number"
            min="9"
            max="99"
            value={this.state.cols}
            onChange={(e) => {
              e.preventDefault();
              this.changeGridRes(e.target.value);
            }}
            className="input-resolution"
          ></input>
          <div className="inc-container">
            <button
              name="inc"
              className="inc-buttons"
              onClick={() => {
                this.incGridRes();
              }}
            >
              ⬆
            </button>
            <button
              name="dcm"
              className="inc-buttons"
              onClick={() => {
                this.decGridRes();
              }}
            >
              ⬇
            </button>
          </div>
        </div>
        <div id="gridContainer">
          <table>
            <tbody
              style={{
                gridTemplateRows: "repeat(" + this.state.rows + ", 1fr)",
              }}
            >
              {this.state.grid.map((el, i) => {
                return (
                  <tr
                    key={i}
                    style={{
                      gridTemplateColumns:
                        "repeat(" + this.state.cols + ", 1fr)",
                    }}
                  >
                    {el.map((inner_el, j) => {
                      return (
                        <td
                          className={
                            this.state.grid[i][j] === 0
                              ? "empty"
                              : this.state.grid[i][j] === 1
                              ? "head"
                              : this.state.grid[i][j] === 2
                              ? "tail"
                              : this.state.grid[i][j] === 3
                              ? "conductor"
                              : "empty"
                          }
                          id={i + "_" + j}
                          key={i + "_" + j}
                          onClick={() => this.changeCellState(i, j)}
                          onMouseMove={
                            this.state.mouseDown === 1
                              ? () => this.changeCellState(i, j)
                              : () => {}
                          }
                        ></td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
