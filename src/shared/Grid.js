import React, { useEffect, useState, useRef } from "react";
import { useBeforeunload } from "react-beforeunload";
import { Canvas } from "./Canvas";
import PostSchema from "./PostSchema";
import { UploadIcon } from "../svg";
import { Logout } from "../components/Authorization";
import { ExitIcon } from "../svg";
import "./Grid.css";

import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth";

export default function Grid(props) {
  const [size, setSize] = useState(props.size);
  const [grid, setGrid] = useState(props.grid);
  // eslint-disable-next-line no-unused-vars
  const [clearGrid, setClearGrid] = useState(props.clearGrid);
  // eslint-disable-next-line no-unused-vars
  const [resetGrid, setResetGrid] = useState(props.resetGrid);
  const nextGrid = useRef(JSON.parse(JSON.stringify(grid)));
  const childCanvas = useRef(null);
  const dispatch = useDispatch();

  //-------GRID FUNCTIONS----------------

  const copyAndResetGrid = () => {
    let saveGrid = JSON.parse(JSON.stringify(nextGrid.current));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        nextGrid.current[i][j] = 0;
      }
    }
    setGrid(JSON.parse(JSON.stringify(saveGrid)));
  };

  const countNeighbors = (row, col) => {
    let count = 0;
    if (row - 1 >= 0) {
      if (grid[row - 1][col] === 1) count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
      if (grid[row - 1][col - 1] === 1) count++;
    }
    if (row - 1 >= 0 && col + 1 < size) {
      if (grid[row - 1][col + 1] === 1) count++;
    }
    if (col - 1 >= 0) {
      if (grid[row][col - 1] === 1) count++;
    }
    if (col + 1 < size) {
      if (grid[row][col + 1] === 1) count++;
    }
    if (row + 1 < size) {
      if (grid[row + 1][col] === 1) count++;
    }
    if (row + 1 < size && col - 1 >= 0) {
      if (grid[row + 1][col - 1] === 1) count++;
    }
    if (row + 1 < size && col + 1 < size) {
      if (grid[row + 1][col + 1] === 1) count++;
    }
    return count;
  };

  const applyRules = (row, col) => {
    let numNeighbors = countNeighbors(row, col);

    if (grid[row][col] === 1) {
      nextGrid.current[row][col] = 2;
    } else if (grid[row][col] === 2) {
      nextGrid.current[row][col] = 3;
    } else if (grid[row][col] === 3) {
      if (numNeighbors === 2 || numNeighbors === 1) {
        nextGrid.current[row][col] = 1;
      } else {
        nextGrid.current[row][col] = 3;
      }
    }
  };

  const play = () => {
    if (props.isStart) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          applyRules(i, j);
        }
      }
      copyAndResetGrid();
    }
  };

  const clearGrids = () => {
    let saveGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        saveGrid[i][j] = 0;
        nextGrid.current[i][j] = 0;
      }
    }
    setGrid(JSON.parse(JSON.stringify(saveGrid)));
  };

  const setNewResGrid = (valueInt) => {
    if (valueInt >= 1 && valueInt <= 400) {
      setSize(valueInt);
      if (props.isStart) {
        props.toggleStart();
      }
      let saveNotResizedGrid = JSON.parse(JSON.stringify(grid));
      let saveGrid = new Array(valueInt);
      for (let i = 0; i < valueInt; i++) {
        nextGrid.current[i] = new Array(valueInt);
        saveGrid[i] = new Array(valueInt);
      }
      for (let i = 0; i < valueInt; i++) {
        for (let j = 0; j < valueInt; j++) {
          saveGrid[i][j] =
            saveNotResizedGrid[i] !== undefined ? saveNotResizedGrid[i][j] : 0;
          nextGrid.current[i][j] = 0;
        }
      }
      setGrid(JSON.parse(JSON.stringify(saveGrid)));
    } else {
      setSize(size);
    }
  };

  //-------CLICK FUNCTIONS----------------

  const changeGridRes = (value) => {
    let valueInt = parseInt(value);
    setNewResGrid(valueInt);
  };
  const incGridRes = () => {
    let valueInt = size + 1;
    setNewResGrid(valueInt);
  };
  const decGridRes = () => {
    let valueInt = size - 1;
    setNewResGrid(valueInt);
  };
  const saveLocalGridScreen = () => {
    let ctx = childCanvas.current;
    localStorage.setItem("grid", JSON.stringify(grid));
    localStorage.setItem("size", JSON.stringify(size));
    localStorage.setItem("gridImg", ctx.toDataURL("png"));
  };
  const clearLocalAll = () => {
    clearGrids();
    setSize(55);
    let saveGrid = new Array(55);
    for (let i = 0; i < 55; i++) {
      nextGrid.current[i] = new Array(55);
      saveGrid[i] = new Array(55);
    }
    for (let i = 0; i < 55; i++) {
      for (let j = 0; j < 55; j++) {
        saveGrid[i][j] = 0;
        nextGrid.current[i][j] = 0;
      }
    }
    setGrid(JSON.parse(JSON.stringify(saveGrid)));

    localStorage.setItem("grid", JSON.stringify(saveGrid));
    localStorage.setItem("size", JSON.stringify(55));
    dispatch(authActions.logout());
  };

  //-------UPDATE CANVAS-------------------

  const updateGridFromCanvas = (x, y, curr) => {
    let saveGrid = JSON.parse(JSON.stringify(grid));
    saveGrid[x][y] = curr;
    setGrid(JSON.parse(JSON.stringify(saveGrid)));
  };

  //-------COMPONENT CHANGES----------------

  useBeforeunload((e) => {
    localStorage.setItem("grid", JSON.stringify(grid));
    localStorage.setItem("size", JSON.stringify(size));
  });

  useEffect(() => {
    const timer = setInterval(play, props.reproductionTime);

    if (props.clearGrid) {
      clearGrids();
      props.toggleClear();
      setClearGrid(false);
    }

    if (props.resetGrid) {
      clearGrids();
      setSize(55);
      let saveGrid = new Array(55);
      for (let i = 0; i < 55; i++) {
        nextGrid.current[i] = new Array(55);
        saveGrid[i] = new Array(55);
      }
      for (let i = 0; i < 55; i++) {
        for (let j = 0; j < 55; j++) {
          saveGrid[i][j] = 0;
          nextGrid.current[i][j] = 0;
        }
      }
      setGrid(JSON.parse(JSON.stringify(saveGrid)));
      props.toggleReset();
      setResetGrid(false);
    }

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.resetGrid,
    props.clearGrid,
    props.isStart,
    props.reproductionTime,
    grid,
  ]);

  return (
    <div className="gridMainContainer">
      <div className="container-res">
        <input
          type="number"
          min="1"
          max="400"
          value={size}
          onChange={(e) => {
            e.preventDefault();
            changeGridRes(e.target.value);
          }}
          className="input-resolution"
        ></input>
        <p className="cross-res">x</p>
        <input
          type="number"
          min="1"
          max="400"
          value={size}
          onChange={(e) => {
            e.preventDefault();
            changeGridRes(e.target.value);
          }}
          className="input-resolution"
        ></input>
        <div className="inc-container">
          <button
            name="inc"
            className="inc-buttons"
            onClick={() => {
              incGridRes();
            }}
          >
            ⬆
          </button>
          <button
            name="dcm"
            className="inc-buttons"
            onClick={() => {
              decGridRes();
            }}
          >
            ⬇
          </button>
        </div>
      </div>

      <div id="gridContainer">
        <Canvas
          curr_click_value={props.curr_click_value}
          size={size}
          grid={grid}
          updateGrid={updateGridFromCanvas}
          theme={props.theme}
          forwardedRef={childCanvas}
        ></Canvas>
        <PostSchema onClick={saveLocalGridScreen} text={""}>
          <UploadIcon />
        </PostSchema>
        <Logout onClick={clearLocalAll} text={""}>
          <ExitIcon />
        </Logout>
      </div>
    </div>
  );
}
