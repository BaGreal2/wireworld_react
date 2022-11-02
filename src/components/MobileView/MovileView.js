import React, { useState, useEffect } from "react";
import dictionary from "../../dictionary.json";

import "./MobileView.css";

export default function MovileView({ lang }) {
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
      <div className="mobile-view-container">
        <h1 className="mobile-view-text">{dict.mobile_view}</h1>
      </div>
    </>
  );
}
