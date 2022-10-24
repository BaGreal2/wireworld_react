import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import { MainPage } from "./components/MainPage";
import { Registration, Login } from "./components/Authorization";
import { SchemasPage } from "./components/User Schemas";

function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.body.className = themeName;
}

(function() {
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

(function() {
  if (localStorage.getItem("language") === "ukr") {
    setLanguage("ukr");
  } else {
    setLanguage("eng");
  }
})();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: localStorage.getItem("language"),
      theme: localStorage.getItem("theme"),
    };
  }
  toggleLang = () => {
    if (localStorage.getItem("language") === "ukr") {
      setLanguage("eng");
    } else {
      setLanguage("ukr");
    }
    this.setState({
      lang: localStorage.getItem("language"),
    });
  };
  toggleTheme = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
    } else {
      setTheme("theme-dark");
    }
    this.setState({
      theme: localStorage.getItem("theme"),
    });
  };
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/registration" />} />
          <Route
            path="/registration"
            element={
              <Registration
                toggleLang={this.toggleLang}
                toggleTheme={this.toggleTheme}
                lang={this.state.lang}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                toggleLang={this.toggleLang}
                toggleTheme={this.toggleTheme}
                lang={this.state.lang}
              />
            }
          />
          <Route
            path="/main"
            element={
              <MainPage
                toggleLang={this.toggleLang}
                toggleTheme={this.toggleTheme}
                lang={this.state.lang}
                theme={this.state.theme}
              />
            }
          />
          <Route
            path="/schemas"
            element={
              <SchemasPage
                toggleLang={this.toggleLang}
                toggleTheme={this.toggleTheme}
                schemas={[
                  {
                    id: 1,
                    title: "OR XOR",
                    description: "the or and xor schema",
                    creator: "xanin",
                  },
                  {
                    id: 2,
                    title: "AND",
                    description: "the and schema",
                    creator: "boom_bem",
                  },
                  {
                    id: 3,
                    title: "My Schema",
                    description: "my beautiful schema",
                    creator: "FunnyBall",
                  },
                  {
                    id: 4,
                    title: "OR XOR",
                    description: "the or and xor schema",
                    creator: "xanin",
                  },
                  {
                    id: 5,
                    title: "AND",
                    description: "the and schema",
                    creator: "boom_bem",
                  },
                  {
                    id: 6,
                    title: "My Schema",
                    description: "my beautiful schema",
                    creator: "FunnyBall",
                  },
                ]}
                lang={this.state.lang}
              />
            }
          />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </Router>
    );
  }
}
