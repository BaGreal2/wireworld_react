import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import { Container, CircularProgress, Flex } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Alert } from "./shared/Alert";

import "./App.css";

import * as AuthGate from "./config/AuthGate";
import { MainPage } from "./components/MainPage";
import { Registration, Login } from "./components/Authorization";
import { PostPage } from "./components/PostPage";
import { SchemasPage } from "./components/User Schemas";
import { SchemaPage } from "./components/SchemaPage";
import MobileView from "./components/MobileView/MovileView";
import { NoSchemas } from "./shared";

import "./config/axios";

function schemasReducer(state, { type, payload }) {
  switch (type) {
    case "SET":
      return payload;

    // case 'LIKE':
    //   return state.map((post) =>
    //     post._id === payload._id
    //       ? { ...post, usersLiked: payload.usersLiked }
    //       : post
    //   );

    // case 'READ_LATER':
    //   return state.map((post) =>
    //     post._id === payload._id
    //       ? { ...post, usersReading: payload.usersReading }
    //       : post
    //   );

    default:
      throw new Error("Action type not implemented");
  }
}

function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.body.className = themeName;
}

(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }
})();

function setLanguage(lang) {
  localStorage.setItem("language", lang);
  document.body.id = lang;
}

(function () {
  if (localStorage.getItem("language") === "ukr") {
    setLanguage("ukr");
  } else {
    setLanguage("eng");
  }
})();

export default function App() {
  const [lang, setLangState] = useState(localStorage.getItem("language"));
  const [theme, setThemeState] = useState(localStorage.getItem("theme"));
  const [schemasLoading, setSchemasLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [schemas, schemasDispatch] = useReducer(schemasReducer, []);
  const [update, setUpdate] = useState(false);

  const isMobile = window.matchMedia(
    "only screen and (max-width: 760px)"
  ).matches;

  //const dispatch = useDispatch();

  const updateList = (value) => {
    setUpdate(value);
    if (page - 1 === (count - 1) / 5) {
      setPage(() => {
        if (page === 1) {
          return page;
        }
        return page - 1;
      });
    }
  };

  const toggleLang = () => {
    if (localStorage.getItem("language") === "ukr") {
      setLanguage("eng");
    } else {
      setLanguage("ukr");
    }
    setLangState(localStorage.getItem("language"));
  };

  const toggleTheme = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
    } else {
      setTheme("theme-dark");
    }
    setThemeState(localStorage.getItem("theme"));
  };

  const decPage = () => {
    setPage(page - 1);
  };
  const incPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setSchemasLoading(true);

    axios({
      method: "GET",
      url: `/schemas?perPage=5&page=${page}`,
    })
      .then((res) => {
        schemasDispatch({ type: "SET", payload: res.data.schemas });
        setCount(res.data.count);
      })
      .catch((error) => setError(error))
      .finally(() => setSchemasLoading(false));
  }, [page, update]);

  return (
    <>
      {isMobile ? (
        <MobileView />
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route
              path="/registration"
              element={
                <AuthGate.PublicOnly>
                  <Registration
                    toggleLang={toggleLang}
                    toggleTheme={toggleTheme}
                    lang={lang}
                  />
                </AuthGate.PublicOnly>
              }
            />
            <Route
              path="/login"
              element={
                <AuthGate.PublicOnly>
                  <Login
                    toggleLang={toggleLang}
                    toggleTheme={toggleTheme}
                    lang={lang}
                  />
                </AuthGate.PublicOnly>
              }
            />
            <Route
              path="/main"
              element={
                <AuthGate.AuthRequired>
                  <MainPage
                    toggleLang={toggleLang}
                    toggleTheme={toggleTheme}
                    lang={lang}
                    theme={theme}
                  />
                </AuthGate.AuthRequired>
              }
            />
            <Route
              path="/post"
              element={
                <AuthGate.AuthRequired>
                  <PostPage
                    toggleLang={toggleLang}
                    toggleTheme={toggleTheme}
                    lang={lang}
                    update={update}
                    updateList={updateList}
                  />
                </AuthGate.AuthRequired>
              }
            />
            <Route
              path="/schemas"
              element={
                <AuthGate.AuthRequired>
                  <Container>
                    {schemasLoading && (
                      <Flex justifyContent="center">
                        <CircularProgress
                          isIndeterminate
                          size="100px"
                          thickness="5px"
                          color="black"
                        />
                      </Flex>
                    )}
                    {error && !schemasLoading && (
                      <Alert
                        alertTitle={error.message}
                        alertDescription={error.responce?.data.message}
                        className="schemas-alert"
                      />
                    )}
                    {schemas.length > 0 && !schemasLoading && !error && (
                      <SchemasPage
                        toggleLang={toggleLang}
                        toggleTheme={toggleTheme}
                        schemas={schemas}
                        lang={lang}
                        decPage={decPage}
                        incPage={incPage}
                        page={page}
                        count={count}
                        update={update}
                        updateList={updateList}
                      />
                    )}
                    {schemas.length === 0 && !schemasLoading && !error && (
                      <NoSchemas
                        toggleLang={toggleLang}
                        toggleTheme={toggleTheme}
                        lang={lang}
                      />
                    )}
                  </Container>
                </AuthGate.AuthRequired>
              }
            />
            <Route
              path="/schemas/:id"
              element={
                <SchemaPage
                  toggleLang={toggleLang}
                  toggleTheme={toggleTheme}
                  lang={lang}
                  theme={theme}
                  update={update}
                  updateList={updateList}
                />
              }
            />
            <Route path="*" element={<Navigate to="/main" replace />} />
          </Routes>
        </Router>
      )}
    </>
  );
}
