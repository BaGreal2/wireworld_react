import React, { useEffect, useRef, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import ReactTooltip from "react-tooltip";
import { DownIcon, UpIcon, UploadIcon } from "../../svg";
import { Canvas } from "../Canvas";
import { RedoBtn, UndoBtn } from "../MemoryBtns";
import { UploadBtn } from "../UploadBtn";

import dictionary from "../../dictionary.json";
import styles from "./styles/Grid.module.css";

export default function Grid(props) {
  const [size, setSize] = useState(props.size);
  const [grid, setGrid] = useState(props.grid);
  const [fullGrid, setFullGrid] = useState(props.fullGrid);
  // eslint-disable-next-line no-unused-vars
  const [clearGrid, setClearGrid] = useState(props.clearGrid);
  // eslint-disable-next-line no-unused-vars
  const [resetGrid, setResetGrid] = useState(props.resetGrid);
  const [offsetY, setOffsetY] = useState(props.offsetY);
  const [offsetX, setOffsetX] = useState(props.offsetX);
  const nextGrid = useRef(JSON.parse(JSON.stringify(grid)));
  const childCanvas = useRef(null);
  const [strokeCount, setStrokeCount] = useState(1);
  const [saveArray, setSaveArray] = useState([JSON.stringify(props.fullGrid)]);
  const [disableRedo, setDisableRedo] = useState(true);
  const [disableUndo, setDisableUndo] = useState(true);
  const isMobile = window.matchMedia(
    "only screen and (max-width: 760px)"
  ).matches;

  //-------COMPONENT UPDATES----------------

  useBeforeunload((e) => {
    if (props.isMain) {
      localStorage.setItem("grid", JSON.stringify(grid));
      localStorage.setItem("fullGrid", JSON.stringify(fullGrid));
      localStorage.setItem("offsetX", JSON.stringify(offsetX));
      localStorage.setItem("offsetY", JSON.stringify(offsetY));
      localStorage.setItem("size", JSON.stringify(size));
    }
  });

  useEffect(() => {
    const timer = setInterval(play, props.reproductionTime);

    if (props.clearGrid) {
      clearGrids();
      props.toggleClear();
      setClearGrid(false);
    }

    if (props.resetGrid) {
      resetGrids();
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

  //-------GRID FUNCTIONS----------------

  const copyAndResetGrid = () => {
    let saveGrid = JSON.parse(JSON.stringify(nextGrid.current));
    let saveFullGrid = JSON.parse(JSON.stringify(fullGrid));
    let startIndexRow = (props.maxSize + 50 - size) / 2 - offsetY;
    let startIndexCol = (props.maxSize + 50 - size) / 2 - offsetX;
    let endIndexRow = startIndexRow + size;
    let endIndexCol = startIndexCol + size;
    for (let i = startIndexRow; i < endIndexRow; i++) {
      for (let j = startIndexCol; j < endIndexCol; j++) {
        saveFullGrid[i][j] =
          nextGrid.current[i - startIndexRow][j - startIndexCol];
      }
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        nextGrid.current[i][j] = 0;
      }
    }

    setFullGrid(JSON.parse(JSON.stringify(saveFullGrid)));
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
    let saveFullGrid = JSON.parse(JSON.stringify(fullGrid));
    for (let i = 0; i < props.maxSize + 50; i++) {
      for (let j = 0; j < props.maxSize + 50; j++) {
        if (i < size && j < size) {
          saveGrid[i][j] = 0;
          nextGrid.current[i][j] = 0;
        }
        saveFullGrid[i][j] = 0;
      }
    }
    setFullGrid(JSON.parse(JSON.stringify(saveFullGrid)));
    setGrid(JSON.parse(JSON.stringify(saveGrid)));
  };

  const resetGrids = () => {
    clearGrids();
    setSize(50);
    setOffsetX(0);
    setOffsetY(0);
    setDisableRedo(true);
    setDisableUndo(true);
    setSaveArray([JSON.stringify(props.fullGrid)]);
    setStrokeCount(1);
    let saveGrid = new Array(50);
    for (let i = 0; i < 50; i++) {
      nextGrid.current[i] = new Array(50);
      saveGrid[i] = new Array(50);
    }
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        saveGrid[i][j] = 0;
        nextGrid.current[i][j] = 0;
      }
    }
    setGrid(JSON.parse(JSON.stringify(saveGrid)));
  };

  const setNewResGrid = (valueInt) => {
    if (valueInt >= 1 && valueInt <= props.maxSize + 50) {
      setSize(valueInt);
      if (props.isStart) {
        props.toggleStart();
      }
      let saveGrid = new Array(valueInt);
      for (let i = 0; i < valueInt; i++) {
        nextGrid.current[i] = new Array(valueInt);
        saveGrid[i] = new Array(valueInt);
      }
      for (let i = 0; i < valueInt; i++) {
        for (let j = 0; j < valueInt; j++) {
          if (
            fullGrid[
              i +
                (size - valueInt) / 2 +
                (props.maxSize + 50 - size) / 2 -
                offsetY
            ]
          ) {
            if (
              fullGrid[
                i +
                  (size - valueInt) / 2 +
                  (props.maxSize + 50 - size) / 2 -
                  offsetY
              ][
                j +
                  (size - valueInt) / 2 +
                  (props.maxSize + 50 - size) / 2 -
                  offsetX
              ]
            ) {
              saveGrid[i][j] =
                fullGrid[
                  i +
                    (size - valueInt) / 2 +
                    (props.maxSize + 50 - size) / 2 -
                    offsetY
                ][
                  j +
                    (size - valueInt) / 2 +
                    (props.maxSize + 50 - size) / 2 -
                    offsetX
                ];
            } else {
              saveGrid[i][j] = 0;
            }
          } else {
            saveGrid[i][j] = 0;
          }
          nextGrid.current[i][j] = 0;
        }
      }
      setGrid(JSON.parse(JSON.stringify(saveGrid)));
    } else {
      setSize(size);
    }
  };

  //-------CLICK FUNCTIONS----------------

  const handleUndo = () => {
    if (strokeCount - 2 < 0) {
      return;
    }
    if (strokeCount - 2 === 0) {
      setDisableUndo(true);
    }
    setDisableRedo(false);
    let saveFullGrid = JSON.parse(saveArray[strokeCount - 2]);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (saveFullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY]) {
          if (
            j + (props.maxSize + 50 - size) / 2 - offsetX <
            props.maxSize + 49
          ) {
            nextGrid.current[i][j] =
              saveFullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY][
                j + (props.maxSize + 50 - size) / 2 - offsetX
              ];
          }
        }
      }
    }
    copyAndResetGrid();
    setFullGrid(saveFullGrid);
    setStrokeCount((prev) => prev - 1);
  };

  const handleRedo = () => {
    if (strokeCount > saveArray.length - 1) {
      return;
    }
    if (strokeCount === saveArray.length - 1) {
      setDisableRedo(true);
    }
    setDisableUndo(false);
    let saveFullGrid = JSON.parse(saveArray[strokeCount]);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (saveFullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY]) {
          if (
            j + (props.maxSize + 50 - size) / 2 - offsetX <
            props.maxSize + 49
          ) {
            nextGrid.current[i][j] =
              saveFullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY][
                j + (props.maxSize + 50 - size) / 2 - offsetX
              ];
          }
        }
      }
    }
    copyAndResetGrid();
    setFullGrid(saveFullGrid);
    setStrokeCount((prev) => prev + 1);
  };

  const changeGridRes = (value) => {
    let valueInt = Number(value);
    if (valueInt % 2 !== 0) {
      if (valueInt < size) {
        valueInt = valueInt - 1;
      } else {
        valueInt = valueInt + 1;
      }
    }
    setNewResGrid(valueInt);
  };

  const incGridRes = () => {
    let valueInt = size + 2;
    setNewResGrid(valueInt);
  };

  const decGridRes = () => {
    let valueInt = size - 2;
    setNewResGrid(valueInt);
  };

  const shiftGrid = (shiftBy) => {
    let saveGrid = JSON.parse(JSON.stringify(grid));
    switch (shiftBy) {
      case "up":
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (fullGrid[i + 1 + (props.maxSize + 50 - size) / 2 - offsetY]) {
              saveGrid[i][j] =
                fullGrid[i + 1 + (props.maxSize + 50 - size) / 2 - offsetY][
                  j + (props.maxSize + 50 - size) / 2 - offsetX
                ];
            } else {
              return;
            }
            nextGrid.current[i][j] = 0;
          }
        }
        setGrid(JSON.parse(JSON.stringify(saveGrid)));
        setOffsetY((prev) => prev - 1);
        break;
      case "down":
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (fullGrid[i - 1 + (props.maxSize + 50 - size) / 2 - offsetY]) {
              saveGrid[i][j] =
                fullGrid[i - 1 + (props.maxSize + 50 - size) / 2 - offsetY][
                  j + (props.maxSize + 50 - size) / 2 - offsetX
                ];
            } else {
              return;
            }
            nextGrid.current[i][j] = 0;
          }
        }

        setOffsetY((prev) => prev + 1);
        setGrid(JSON.parse(JSON.stringify(saveGrid)));
        break;
      case "left":
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (fullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY]) {
              if (
                j + 1 + (props.maxSize + 50 - size) / 2 - offsetX <
                props.maxSize + 49
              ) {
                saveGrid[i][j] =
                  fullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY][
                    j + 1 + (props.maxSize + 50 - size) / 2 - offsetX
                  ];
              } else {
                return;
              }
            } else {
              return;
            }
            nextGrid.current[i][j] = 0;
          }
        }
        setGrid(JSON.parse(JSON.stringify(saveGrid)));
        setOffsetX((prev) => prev - 1);
        break;
      case "right":
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (fullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY]) {
              if (j - 1 + (props.maxSize + 50 - size) / 2 - offsetX > 0) {
                saveGrid[i][j] =
                  fullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY][
                    j - 1 + (props.maxSize + 50 - size) / 2 - offsetX
                  ];
              } else {
                return;
              }
            } else {
              return;
            }

            nextGrid.current[i][j] = 0;
          }
        }
        setOffsetX((prev) => prev + 1);
        setGrid(JSON.parse(JSON.stringify(saveGrid)));
        break;

      default:
        break;
    }
  };

  const handleKeyBinds = (e) => {
    let valueInt = null;
    switch (e.key) {
      case "-":
        valueInt = size + 2;
        setNewResGrid(valueInt);
        break;
      case "+":
        valueInt = size - 2;
        setNewResGrid(valueInt);
        break;
      case "j":
      case "ArrowDown":
        shiftGrid("up");
        break;
      case "h":
      case "ArrowLeft":
        shiftGrid("right");
        break;
      case "k":
      case "ArrowUp":
        shiftGrid("down");
        break;
      case "l":
      case "ArrowRight":
        shiftGrid("left");
        break;
      case "1":
        props.setCurrClickValue("1");
        break;
      case "2":
        props.setCurrClickValue("2");
        break;
      case "3":
        props.setCurrClickValue("3");
        break;
      case "4":
        props.setCurrClickValue("0");
        break;
      case " ":
        props.toggleStart();
        break;
      case "c":
        props.toggleClear();
        break;
      case "r":
        props.toggleReset();
        break;
      default:
        break;
    }
    if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
      handleUndo();
    } else if (e.key === "y" && (e.ctrlKey || e.metaKey)) {
      handleRedo();
    }
  };
  const saveLocalGridScreen = () => {
    let ctx = childCanvas.current;
    localStorage.setItem("grid", JSON.stringify(grid));
    localStorage.setItem("size", JSON.stringify(size));
    localStorage.setItem("gridImg", ctx.toDataURL("png"));
  };

  //-------UPDATE CANVAS-------------------

  const updateGridFromCanvas = (x, y, curr) => {
    let saveGrid = JSON.parse(JSON.stringify(grid));
    let saveFullGrid = JSON.parse(JSON.stringify(fullGrid));
    props.maxSize + 50 - size !== 0
      ? (saveFullGrid[x + (props.maxSize + 50 - size) / 2 - offsetY][
          y + (props.maxSize + 50 - size) / 2 - offsetX
        ] = curr)
      : (saveFullGrid[x][y] = curr);
    saveGrid[x][y] = curr;
    setGrid(JSON.parse(JSON.stringify(saveGrid)));
    setFullGrid(JSON.parse(JSON.stringify(saveFullGrid)));
  };

  return (
    <div className={styles.grid_main_container}>
      <div className={styles.container_res}>
        <input
          type="number"
          min="1"
          max={props.maxSize + 50}
          value={size}
          onChange={(e) => {
            e.preventDefault();
            changeGridRes(e.target.value);
          }}
          className={styles.input_resolution}
        ></input>
        <p className={styles.cross_res}>x</p>
        <input
          type="number"
          min="1"
          max={props.maxSize + 50}
          value={size}
          onChange={(e) => {
            e.preventDefault();
            changeGridRes(e.target.value);
          }}
          className={styles.input_resolution}
        ></input>
        {isMobile ? (
          <div className={styles.inc_container}>
            <button className={styles.inc_buttons} onClick={() => incGridRes()}>
              <UpIcon className={styles.icon_size} />
            </button>
            <button className={styles.inc_buttons} onClick={() => decGridRes()}>
              <DownIcon className={styles.icon_size} />
            </button>
          </div>
        ) : (
          <div
            className={styles.inc_container}
            data-offset="{'left': 0, 'right': 10}"
            data-place="right"
            data-tip={dictionary.eng.zoom_hint}
          >
            <button className={styles.inc_buttons} onClick={() => incGridRes()}>
              <UpIcon className={styles.icon_size} />
            </button>
            <button className={styles.inc_buttons} onClick={() => decGridRes()}>
              <DownIcon className={styles.icon_size} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.grid_container}>
        <Canvas
          currClickValue={props.currClickValue}
          size={size}
          grid={grid}
          fullGrid={fullGrid}
          updateGrid={updateGridFromCanvas}
          theme={props.theme}
          forwardedRef={childCanvas}
          onKeyPress={handleKeyBinds}
          saveArray={saveArray}
          setSaveArray={setSaveArray}
          strokeCount={strokeCount}
          setStrokeCount={setStrokeCount}
          setDisableRedo={setDisableRedo}
          setDisableUndo={setDisableUndo}
        ></Canvas>
        {props.showUpload && (
          <UploadBtn onClick={saveLocalGridScreen} text={""}>
            <UploadIcon />
          </UploadBtn>
        )}
        {isMobile ? (
          <div
            className={
              props.isMain
                ? styles.memory_container
                : styles.memory_container_user
            }
          >
            <UndoBtn disabled={disableUndo} onClick={handleUndo} />
            <RedoBtn disabled={disableRedo} onClick={handleRedo} />
          </div>
        ) : (
          <div
            data-tip={dictionary.eng.memory_hint}
            className={
              props.isMain
                ? styles.memory_container
                : styles.memory_container_user
            }
          >
            <UndoBtn disabled={disableUndo} onClick={handleUndo} />
            <RedoBtn disabled={disableRedo} onClick={handleRedo} />
          </div>
        )}
      </div>
      <ReactTooltip
        place="left"
        type="dark"
        offset={{ left: 10 }}
        effect="solid"
        delayShow={700}
      />
    </div>
  );
}
