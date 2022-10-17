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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: localStorage.getItem("language"),
    };
  }
  toggleLang = () => {
    this.setState({
      lang: localStorage.getItem("language"),
    });
  };
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/registration" />} />
          <Route
            path="/registration"
            element={<Registration lang={this.state.lang} />}
          />
          <Route path="/login" element={<Login lang={this.state.lang} />} />
          <Route
            path="/main"
            element={
              <MainPage toggleLang={this.toggleLang} lang={this.state.lang} />
            }
          />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </Router>
    );
  }
}
