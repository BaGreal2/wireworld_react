import React, { useState, useEffect } from "react";
import List from "./List";
import { Topbar } from "../../shared";
import { Button } from "../../shared";
import "./styles/User Schemas.css";

import dictionary from "../../dictionary.json";

function SchemasPage({
  toggleLang,
  toggleTheme,
  schemas,
  lang,
  decPage,
  incPage,
  page,
  count,
}) {
  let [dict, setDict] = useState(() => {
    if (localStorage.getItem("language") === "ukr") {
      return dictionary.ukr;
    } else {
      return dictionary.eng;
    }
  });
  useEffect(() => {
    if (lang === "ukr" && dict !== dictionary.ukr) {
      setDict(dictionary.ukr);
    } else if (lang === "eng" && dict !== dictionary.eng) {
      setDict(dictionary.eng);
    }
  }, [lang, dict, page, count]);
  return (
    <>
      <Topbar
        theme_func={toggleTheme}
        lang_func={toggleLang}
        needLang={true}
        needBack={true}
      ></Topbar>
      <List schemas={schemas}></List>
      <div className="pages-btns-container">
        {page > 1 && (
          <Button
            id="prev"
            classname={"main_buttons custom-btn previous"}
            text={dict.previous}
            action={decPage}
          />
        )}
        {page < count / 5 && (
          <Button
            id="next"
            classname={"main_buttons custom-btn next"}
            text={dict.next}
            action={incPage}
          />
        )}
      </div>
    </>
  );
}

export default SchemasPage;
