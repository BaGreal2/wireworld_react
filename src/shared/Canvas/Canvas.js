import React, { Component } from "react";
import "./Canvas.css";

export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.darkColors = {
      conductor: "#e0c134",
      head: "#4d38c4",
      tail: "#b93542",
      background: "#312f2f",
      sub_line: "#9d9c9c",
    };
    this.lightColors = {
      conductor: "#f9f348",
      head: "#6248f9",
      tail: "#f9485a",
      background: "#fff",
      sub_line: "#676767",
    };

    if (props.theme === "theme-dark") {
      this.colors = this.darkColors;
    } else {
      this.colors = this.lightColors;
    }

    this.canvasRef = React.createRef();
  }

  //-------COMPONENT CHANGES----------------

  componentDidMount() {
    this.ctx = this.canvasRef.getContext("2d");
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("gridImg", this.canvasRef.toDataURL("png"));
    });
    this.cellSize = this.canvasRef.width / this.props.rows;
    if (this.props.theme !== localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "theme-dark") {
        this.colors = this.darkColors;
        this.resetCanvas();
      } else {
        this.colors = this.lightColors;
        this.resetCanvas();
      }
    }

    this.resetCanvas();
    this.updateView();
  }

  componentDidUpdate() {
    this.cellSize = this.canvasRef.width / this.props.rows;
    if (this.props.theme !== localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "theme-dark") {
        this.colors = this.darkColors;
      } else {
        this.colors = this.lightColors;
      }
    }

    this.resetCanvas();
    this.updateView();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", () => {
      localStorage.setItem("gridImg", this.canvasRef.toDataUrl("png"));
    });
  }

  //-------CANVAS FUNCTIONS----------------

  setBackground = (color1, color2) => {
    this.ctx.fillStyle = color1;
    this.ctx.strokeStyle = color2;
    this.ctx.lineWidth = 5;

    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.ctx.fillRect(0, 0, this.canvasRef.height, this.canvasRef.width);

    for (let x = 1; x < this.canvasRef.width; x += this.cellSize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvasRef.height);
    }
    for (let y = 1; y < this.canvasRef.height; y += this.cellSize) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvasRef.width, y);
    }

    this.ctx.stroke();
  };
  drawSquare = (x, y, color) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * this.cellSize + 3.5,
      y * this.cellSize + 3.5,
      this.cellSize - 5,
      this.cellSize - 5
    );
  };
  resetCanvas = () => {
    this.ctx.beginPath();
    this.setBackground(this.colors.background, this.colors.sub_line);
  };
  updateView() {
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        switch (this.props.grid[i][j]) {
          case 1:
            this.drawSquare(j, i, this.colors.head);
            break;
          case 2:
            this.drawSquare(j, i, this.colors.tail);
            break;
          case 3:
            this.drawSquare(j, i, this.colors.conductor);
            break;
          default:
            break;
        }
      }
    }
  }

  //-------CLICK FUNCTIONS----------------

  clickCell(e) {
    let x = Math.floor(e.nativeEvent.offsetX / (this.cellSize / 5));
    let y = Math.floor(e.nativeEvent.offsetY / (this.cellSize / 5));
    switch (this.props.curr_click_value) {
      case "0":
        break;
      case "1":
        this.drawSquare(x, y, this.colors.head);
        break;
      case "2":
        this.drawSquare(x, y, this.colors.tail);
        break;
      case "3":
        this.drawSquare(x, y, this.colors.conductor);
        break;
      default:
        this.drawSquare(x, y, this.colors.conductor);
    }
    this.props.updateGrid(y, x, parseInt(this.props.curr_click_value));
  }
  clickMoveCell(e) {
    if (this.props.mouseDown) {
      let x = Math.floor(e.nativeEvent.offsetX / (this.cellSize / 5));
      let y = Math.floor(e.nativeEvent.offsetY / (this.cellSize / 5));
      switch (this.props.curr_click_value) {
        case "0":
          break;
        case "1":
          this.drawSquare(x, y, this.colors.head);
          break;
        case "2":
          this.drawSquare(x, y, this.colors.tail);
          break;
        case "3":
          this.drawSquare(x, y, this.colors.conductor);
          break;
        default:
          this.drawSquare(x, y, this.colors.conductor);
      }
      this.props.updateGrid(y, x, parseInt(this.props.curr_click_value));
    }
  }

  render() {
    return (
      <canvas
        ref={(el) => (this.canvasRef = el)}
        onClick={(el) => this.clickCell(el)}
        onMouseMove={(el) => this.clickMoveCell(el)}
        className="canvas"
        width={window.innerHeight * 0.73 * 5}
        height={window.innerHeight * 0.73 * 5}
      />
    );
  }
}
