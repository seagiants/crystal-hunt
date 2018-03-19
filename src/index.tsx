import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// const randomId: string = (Math.floor(Math.random() * 1000) + 1).toString();

ReactDOM.render(
  <div>
    <App playerID="0" />
    <App playerID="1" />
  </div>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
