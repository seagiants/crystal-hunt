import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const randomId: string = (Math.floor(Math.random() * 1000) + 1).toString();

ReactDOM.render(<App playerID={randomId} />, document.getElementById(
  "root"
) as HTMLElement);

registerServiceWorker();
