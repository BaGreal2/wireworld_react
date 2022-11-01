import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/Controls.css";
import { Button } from "../../shared";
import { Dropdown } from "../../shared";

import dictionary from "../../dictionary.json";

export default function Controls(props) {
  let [dict, setDict] = useState(() => {
    if (localStorage.getItem("language") === "ukr") {
      return dictionary.ukr;
    } else {
      return dictionary.eng;
    }
  });

  //-------COMPONENT CHANGES----------------

  useEffect(() => {
    if (props.lang === "ukr" && dict !== dictionary.ukr) {
      setDict(dictionary.ukr);
    } else if (props.lang === "eng" && dict !== dictionary.eng) {
      setDict(dictionary.eng);
    }
  }, [props.lang, dict]);

  return (
    <div className="controls">
      <Button
        id={"start"}
        classname={"main_buttons custom-btn"}
        text={props.startLabel}
        action={props.toggleStart}
      ></Button>
      {props.isMain && (
        <Button
          id={"clear"}
          classname={"main_buttons custom-btn"}
          text={dict.clear}
          action={props.toggleClear}
        ></Button>
      )}
      {props.isMain && (
        <Button
          id={"reset"}
          classname={"main_buttons custom-btn"}
          text={dict.reset}
          action={props.toggleReset}
        ></Button>
      )}
      {props.isMain && (
        <Link to="/schemas" style={{ textDecoration: "none" }}>
          <Button
            id={"usr_levels"}
            classname={"main_buttons custom-btn"}
            text={dict.user_levels}
          ></Button>
        </Link>
      )}
      <Dropdown
        title={dict.pick_item}
        content={[
          { id: "empty", value: "0", text: dict.empty },
          { id: "head", value: "1", text: dict.head },
          { id: "tail", value: "2", text: dict.tail },
          { id: "conductor", value: "3", text: dict.conductor },
        ]}
        onItemChange={props.onValueChange}
        selected={
          parseInt(props.curr_click_value) === 0
            ? dict.empty
            : parseInt(props.curr_click_value) === 1
            ? dict.head
            : parseInt(props.curr_click_value) === 2
            ? dict.tail
            : parseInt(props.curr_click_value) === 3
            ? dict.conductor
            : dict.conductor
        }
      ></Dropdown>
      <Dropdown
        title={dict.pick_speed}
        content={[
          { id: "empty", value: "210", text: dict.slow },
          { id: "head", value: "100", text: dict.medium },
          { id: "tail", value: "30", text: dict.fast },
          { id: "conductor", value: "10", text: dict.unlimited },
        ]}
        onItemChange={props.onSpeedChange}
        selected={
          parseInt(props.reproductionTime) === 210
            ? dict.slow
            : parseInt(props.reproductionTime) === 100
            ? dict.medium
            : parseInt(props.reproductionTime) === 30
            ? dict.fast
            : parseInt(props.reproductionTime) === 10
            ? dict.unlimited
            : dict.medium
        }
      ></Dropdown>
    </div>
  );
}
