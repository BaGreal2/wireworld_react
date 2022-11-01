import React, { useEffect, useRef, useState } from "react";
import "./Canvas.css";

export default function Canvas(props) {
  let canvasRef = useRef(props.forwardedRef);
  const [ctx, setCtx] = useState();
  let cellSize = useRef(null);
  let darkColors = {
    conductor: "#e0c134",
    head: "#4d38c4",
    tail: "#b93542",
    background: "#312f2f",
    sub_line: "#9d9c9c",
  };
  let lightColors = {
    conductor: "#f9f348",
    head: "#6248f9",
    tail: "#f9485a",
    background: "#fff",
    sub_line: "#676767",
  };
  let colors = lightColors;
  if (props.theme === "theme-dark") {
    colors = darkColors;
  }

  //-------CANVAS FUNCTIONS----------------

  const setBackground = (color1, color2) => {
    ctx.fillStyle = color1;
    ctx.strokeStyle = color2;
    ctx.lineWidth = 5;
    ctx.clearRect(
      0,
      0,
      canvasRef.current.current.width,
      canvasRef.current.current.height
    );
    ctx.fillRect(
      0,
      0,
      canvasRef.current.current.height,
      canvasRef.current.current.width
    );

    for (
      let x = 1;
      x < canvasRef.current.current.width;
      x += cellSize.current
    ) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasRef.current.current.height);
    }
    for (
      let y = 1;
      y < canvasRef.current.current.height;
      y += cellSize.current
    ) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvasRef.current.current.width, y);
    }

    ctx.stroke();
  };
  const drawSquare = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(
      x * cellSize.current + 3.5,
      y * cellSize.current + 3.5,
      cellSize.current - 5,
      cellSize.current - 5
    );
  };
  const resetCanvas = () => {
    ctx.beginPath();
    setBackground(colors.background, colors.sub_line);
  };
  const updateView = () => {
    for (let i = 0; i < props.size; i++) {
      for (let j = 0; j < props.size; j++) {
        switch (props.grid[i][j]) {
          case 1:
            drawSquare(j, i, colors.head);
            break;
          case 2:
            drawSquare(j, i, colors.tail);
            break;
          case 3:
            drawSquare(j, i, colors.conductor);
            break;
          default:
            break;
        }
      }
    }
  };

  //-------CLICK FUNCTIONS----------------

  const clickCell = (e) => {
    let x = Math.floor(e.nativeEvent.offsetX / (cellSize.current / 5));
    let y = Math.floor(e.nativeEvent.offsetY / (cellSize.current / 5));
    switch (props.curr_click_value) {
      case "0":
        break;
      case "1":
        drawSquare(x, y, colors.head);
        break;
      case "2":
        drawSquare(x, y, colors.tail);
        break;
      case "3":
        drawSquare(x, y, colors.conductor);
        break;
      default:
        drawSquare(x, y, colors.conductor);
    }
    props.updateGrid(y, x, parseInt(props.curr_click_value));
  };
  const clickMoveCell = (e) => {
    if (e.pressure <= 0) return;
    let x = Math.floor(e.nativeEvent.offsetX / (cellSize.current / 5));
    let y = Math.floor(e.nativeEvent.offsetY / (cellSize.current / 5));
    switch (props.curr_click_value) {
      case "0":
        break;
      case "1":
        drawSquare(x, y, colors.head);
        break;
      case "2":
        drawSquare(x, y, colors.tail);
        break;
      case "3":
        drawSquare(x, y, colors.conductor);
        break;
      default:
        drawSquare(x, y, colors.conductor);
    }
    props.updateGrid(y, x, parseInt(props.curr_click_value));
  };

  //-------COMPONENT CHANGES----------------

  useEffect(() => {
    if (!ctx) {
      setCtx(canvasRef.current.current.getContext("2d"));
    }

    cellSize.current = canvasRef.current.current.width / props.size;
    if (props.theme !== localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "theme-dark") {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        colors = darkColors;
      } else {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        colors = lightColors;
      }
    }
    if (ctx) {
      resetCanvas();
      updateView();
    }
  }, [ctx, props.theme, props.size, props.grid]);

  return (
    <canvas
      ref={props.forwardedRef}
      onClick={(el) => clickCell(el)}
      onPointerMove={(el) => clickMoveCell(el)}
      className="canvas"
      width={window.innerHeight * 0.73 * 5}
      height={window.innerHeight * 0.73 * 5}
    />
  );
}
