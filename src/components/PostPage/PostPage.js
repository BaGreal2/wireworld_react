import React, { useEffect, useState } from "react";
import { Topbar } from "../../shared";
import FormPostSchema from "./FormPostSchema";

import "./PostPage.css";

import dictionary from "../../dictionary.json";

export default function PostPage({ toggleLang, toggleTheme, lang }) {
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
        needTitle={true}
        needLang={true}
      ></Topbar>
      <FormPostSchema
        title={dict.title}
        description={dict.description}
        post={dict.post}
      />
    </>
  );
}
