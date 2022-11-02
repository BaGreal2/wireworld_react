import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert } from "../../shared/Alert";
import { useNavigate } from "react-router-dom";
import { Topbar } from "../../shared";
import FormPostSchema from "./FormPostSchema";

import "./PostPage.css";

import dictionary from "../../dictionary.json";

export default function PostPage({
  toggleLang,
  toggleTheme,
  lang,
  update,
  updateList,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  let [dict, setDict] = useState(() => {
    if (localStorage.getItem("language") === "ukr") {
      return dictionary.ukr;
    } else {
      return dictionary.eng;
    }
  });

  function createSchema(data) {
    data.preventDefault();
    setLoading(true);
    let title = data.target[0].value;
    let description = data.target[1].value;
    data = {
      title,
      description,
      cell_arr: localStorage.getItem("grid"),
      size: JSON.parse(localStorage.getItem("size")),
      rating: [],
      creator: localStorage.getItem("username"),
    };

    axios({
      method: "POST",
      url: "/schemas",
      data,
    })
      .then((res) => {
        updateList(!update);
        navigate(`/schemas/${res.data._id}`, true);
      })
      .catch((error) => {
        console.dir(error);
        setError(error);
        setLoading(false);
      });
  }

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
      {error && !loading && (
        <Alert
          alertTitle={error.message}
          alertDescription={error.responce?.data.message}
          className="post-alert"
        />
      )}

      <Topbar
        theme_func={toggleTheme}
        lang_func={toggleLang}
        needLang={true}
        needBack={true}
      ></Topbar>
      <FormPostSchema
        title={dict.title}
        description={dict.description}
        post={dict.post}
        onSubmit={createSchema}
      />
    </>
  );
}
