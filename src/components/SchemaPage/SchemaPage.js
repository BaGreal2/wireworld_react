import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import { CircularProgress, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Grid } from "../../shared";
import Controls from "../MainPage/Controls";
import { Topbar } from "../../shared";
import { Alert } from "../../shared/Alert";

import dictionary from "../../dictionary.json";

import "../../config/axios";
import "./SchemaPage.css";

function schemaReducer(state, { type, payload }) {
  switch (type) {
    case "SET":
      return payload;
    default:
      throw new Error("Action type not implemented");
  }
}

export default function SchemaPage({
  toggleLang,
  toggleTheme,
  lang,
  theme,
  update,
  updateList,
}) {
  const [curr_click_value, setCurr_click_value] = useState(3);
  const [speed, setSpeed] = useState(100);
  const [isStart, setIsStart] = useState(false);
  const [clearGrid, setClearGrid] = useState(false);
  const [resetGrid, setResetGrid] = useState(false);
  const [dict, setDict] = useState(dictionary.eng);
  const searchParams = useParams();
  const [startLabel, setStartLabel] = useState(() => {
    return localStorage.getItem("language") === "eng" ? "Start" : "Старт";
  });
  const [schema, schemaDispatch] = useReducer(schemaReducer, []);
  const [schemaLoading, setSchemaLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSchemaLoading(true);

    axios({
      method: "GET",
      url: `/schemas/${searchParams.id}`,
    })
      .then((res) => {
        schemaDispatch({ type: "SET", payload: res.data.schema });
      })
      .catch((error) => setError(error))
      .finally(() => setSchemaLoading(false));
    if (lang === "ukr" && dict !== dictionary.ukr) {
      setDict(dictionary.ukr);
      setStartLabel(dictionary.ukr.start);
    } else if (lang === "eng" && dict !== dictionary.eng) {
      setDict(dictionary.eng);
      setStartLabel(dictionary.eng.start);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, dict]);

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

  const sendRate = (data) => {
    data.preventDefault();
    let dataNum = Number(data.target[0].value);
    let newRating = [...schema.rating, dataNum];
    let dataUpdate = {
      title: schema.title,
      description: schema.description,
      cell_arr: schema.cell_arr,
      size: schema.size,
      rating: newRating,
      creator: schema.creator,
      creatorName: schema.creatorName,
    };
    axios({
      method: "PUT",
      url: `/schemas/${schema._id}`,
      data: dataUpdate,
    })
      .then((res) => {
        console.log(res.data.editedSchema);
        updateList(!update);
      })
      .catch((error) => {
        console.dir(error);
      });
  };
  return (
    <div>
      {schemaLoading && (
        <Flex justifyContent="center">
          <CircularProgress
            isIndeterminate
            size="100px"
            thickness="5px"
            color="black"
          />
        </Flex>
      )}
      {error && !schemaLoading && (
        <Alert
          alertTitle={error.message}
          alertDescription={error.responce?.data.message}
          className="schema-alert"
        />
      )}
      {schema && !schemaLoading && !error && (
        <>
          <Topbar
            theme_func={toggleTheme}
            lang_func={toggleLang}
            needLang={true}
            needBack={true}
          ></Topbar>
          <h1 className="schema-open-title">{schema.title}</h1>
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
            isMain={false}
            isOwner={
              JSON.parse(JSON.parse(localStorage.getItem("persist:auth")).user)
                ._id === schema.creator
            }
            sendRate={sendRate}
          ></Controls>
          <Grid
            size={schema.size}
            grid={JSON.parse(schema.cell_arr)}
            nextGrid={JSON.parse(schema.cell_arr)}
            curr_click_value={curr_click_value}
            reproductionTime={speed}
            isStart={isStart}
            clearGrid={clearGrid}
            resetGrid={resetGrid}
            toggleStart={toggleStart}
            toggleClear={toggleClear}
            toggleReset={toggleReset}
            theme={theme}
            showUpload={false}
            isMain={false}
          ></Grid>
        </>
      )}
    </div>
  );
}
