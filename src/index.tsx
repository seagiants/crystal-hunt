import * as React from "react";
import * as ReactDOM from "react-dom";

import GameSelector from "./components/GameSelector";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const randomId: string = (Math.floor(Math.random() * 100000) + 1).toString();
console.log(randomId);

ReactDOM.render(
  <div>
    <GameSelector />
  </div>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
