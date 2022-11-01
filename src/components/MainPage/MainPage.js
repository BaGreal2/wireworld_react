import React, { useEffect, useState } from "react";

import { Grid } from "../../shared";
import Controls from "./Controls";
import { Topbar } from "../../shared";
import dictionary from "../../dictionary.json";

export default function MainPage({ toggleLang, toggleTheme, lang, theme }) {
  const [curr_click_value, setCurr_click_value] = useState(3);
  const [speed, setSpeed] = useState(100);
  const [isStart, setIsStart] = useState(false);
  const [clearGrid, setClearGrid] = useState(false);
  const [resetGrid, setResetGrid] = useState(false);
  const [dict, setDict] = useState(dictionary.eng);
  const [startLabel, setStartLabel] = useState(() => {
    return localStorage.getItem("language") === "eng" ? "Start" : "Старт";
  });
  const [size, setSize] = useState(() => {
    return localStorage.getItem("size")
      ? JSON.parse(localStorage.getItem("size"))
      : 55;
  });
  const [grid, setGrid] = useState(() => {
    if (localStorage.getItem("grid")) {
      return JSON.parse(localStorage.getItem("grid"));
    } else {
      let saveGrid = new Array(size);
      for (let i = 0; i < size; i++) {
        saveGrid[i] = new Array(size);
      }

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          saveGrid[i][j] = 0;
        }
      }
      return JSON.parse(JSON.stringify(saveGrid));
    }
  });

  useEffect(() => {
    if (lang === "ukr" && dict !== dictionary.ukr) {
      setDict(dictionary.ukr);
      setStartLabel(dictionary.ukr.start);
    } else if (lang === "eng" && dict !== dictionary.eng) {
      setDict(dictionary.eng);
      setStartLabel(dictionary.eng.start);
    }

    if (
      localStorage.getItem("size") &&
      size !== JSON.parse(localStorage.getItem("size"))
    ) {
      setSize(JSON.parse(localStorage.getItem("size")));
    }

    if (
      localStorage.getItem("grid") &&
      JSON.stringify(grid) !== localStorage.getItem("grid")
    ) {
      setGrid(JSON.parse(localStorage.getItem("grid")));
    }
  }, [lang, dict, size, grid]);
  const changeClickSpeed = (value) => {
    setSpeed(value);
  };
  const changeClickValue = (value) => {
    setCurr_click_value(value);
  };
  const toggleStart = () => {
    setIsStart(!isStart);
    changeStartLabel();
  };
  const changeStartLabel = () => {
    if (isStart) {
      setStartLabel(dict.continue);
    } else {
      setStartLabel(dict.pause);
    }
  };
  const toggleClear = () => {
    setIsStart(false);
    setClearGrid(!clearGrid);
    setStartLabel(dict.start);
  };
  const toggleReset = () => {
    setIsStart(false);
    setResetGrid(!resetGrid);
    setStartLabel(dict.start);
  };

  return (
    <div>
      <Topbar
        theme_func={toggleTheme}
        lang_func={toggleLang}
        needTitle={true}
        needLang={true}
      ></Topbar>
      <Controls
        onValueChange={changeClickValue}
        onSpeedChange={changeClickSpeed}
        curr_click_value={curr_click_value}
        reproductionTime={speed}
        toggleStart={toggleStart}
        toggleClear={toggleClear}
        toggleReset={toggleReset}
        startLabel={startLabel}
        lang={lang}
        isMain={true}
      ></Controls>
      <Grid
        size={size}
        grid={grid}
        nextGrid={grid}
        curr_click_value={curr_click_value}
        reproductionTime={speed}
        isStart={isStart}
        clearGrid={clearGrid}
        resetGrid={resetGrid}
        toggleStart={toggleStart}
        toggleClear={toggleClear}
        toggleReset={toggleReset}
        theme={theme}
        showUpload={true}
        isMain={true}
      ></Grid>
    </div>
  );
}
