import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

import { Demo } from "./views/demo";
import { Intro } from "./views/intro";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("coma"),
);
