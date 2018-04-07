import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import "./index.css";

const randomId: string = (Math.floor(Math.random() * 100000) + 1).toString();
console.log(randomId);

ReactDOM.render(
  <div>
    <Header />
    <Main />
  </div>,
  document.getElementById("root") as HTMLElement
);
