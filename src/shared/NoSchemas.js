import React, { useState, useEffect } from "react";
import Topbar from "./Topbar/Topbar";

import dictionary from "../dictionary.json";

export default function NoSchemas({ lang, toggleTheme, toggleLang }) {
  let [dict, setDict] = useState(() => {
    if (localStorage.getItem("language") === "ukr") {
      return dictionary.ukr;
    } else {
      return dictionary.eng;
    }
  });

  //-------COMPONENT CHANGES----------------

  useEffect(() => {
    if (lang === "ukr" && dict !== dictionary.ukr) {
      setDict(dictionary.ukr);
    } else if (lang === "eng" && dict !== dictionary.eng) {
      setDict(dictionary.eng);
    }
  }, [lang, dict]);
  return (
    <>
      <Topbar
        theme_func={toggleTheme}
        lang_func={toggleLang}
        needLang={true}
        needBack={true}
      ></Topbar>
      <div className="no-schemas-container">
        <h1 className="no-schemas-text">{dict.no_schemas}</h1>
      </div>
    </>
  );
}
