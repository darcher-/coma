import * as React from "react";

import { _copy, _props, _state } from "./fixtures";

import { ArrowRight } from "src/components/icons/arrow-right";
import { Link } from "react-router-dom";

export function Intro(): React.ReactElement {
  document.activeElement;
  return (
    <div id="coma-intro">
      <header>
        <h1>
          Welcome to <em>Coma</em>!
        </h1>
        <p>
          A focus state tracker; to emphasize user keyboard
          <br />
          interactions by providing an easy to acquire trail
          <br />
          as{" "}
          <code
            style={{
              padding: ".25rem .5rem",
              fontWeight: 500,
              fontFamily: "'Share Tech Mono', monospace",
              background: "#ffeaa7",
              color: "#4b4b4b",
            }}>
            document.
            <mark
              style={{
                color: "rgb(0 0 0 / .333)",
              }}>
              activeElement
            </mark>
          </code>{" "}
          is updated.
        </p>
      </header>
      <nav className="button-group">
        <Link className="button" to="/demo">
          <span className="button-content">
            <span className="button-text">Go to demo</span>
          </span>
        </Link>
      </nav>
    </div>
  );
}
