import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import * as AuthGate from "./config/AuthGate";
import { MainPage } from "./components/MainPage";
import { Registration, Login } from "./components/Authorization";
import { PostPage } from "./components/PostPage";
import { SchemasPage } from "./components/User Schemas";
import { SchemaPage } from "./components/SchemaPage";

import "./config/axios";

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
  return (
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
              />
            </AuthGate.AuthRequired>
          }
        />
        <Route
          path="/schemas"
          element={
            <AuthGate.AuthRequired>
              <SchemasPage
                toggleLang={toggleLang}
                toggleTheme={toggleTheme}
                schemas={[
                  {
                    id: 1,
                    title: "OR XOR",
                    description:
                      "the or and xor schema difjdso fosdkfodkfpsk fpsokfopsdk fposfk dofksdp",
                    creator: "xanin",
                    rating: 3.2,
                  },
                  {
                    id: 2,
                    title: "AND",
                    description: "the and schema",
                    creator: "boom_bem",
                    rating: 4.8,
                  },
                  {
                    id: 3,
                    title: "My Schema",
                    description: "my beautiful schema",
                    creator: "FunnyBall",
                    rating: 2.8,
                  },
                  {
                    id: 4,
                    title: "OR XOR",
                    description: "the or and xor schema",
                    creator: "xanin",
                    rating: 3.2,
                  },
                  {
                    id: 5,
                    title: "AND",
                    description: "the and schema",
                    creator: "boom_bem",
                    rating: 4.8,
                  },
                  {
                    id: 6,
                    title: "My Schema",
                    description: "my beautiful schema",
                    creator: "FunnyBall",
                    rating: 2.8,
                  },
                ]}
                lang={lang}
              />
            </AuthGate.AuthRequired>
          }
        />
        <Route path="/schemas/:id" element={<SchemaPage />} />
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </Router>
  );
}
