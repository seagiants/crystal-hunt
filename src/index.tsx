import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import * as Mousetrap from "mousetrap";
import "./index.css";

Mousetrap.bind("up up down down left right left right b a enter", () => {
  console.log("K O N A M I    C O D E");
});

ReactDOM.render(
  <div>
    <Header />
    <Main />
  </div>,
  document.getElementById("root") as HTMLElement
);
