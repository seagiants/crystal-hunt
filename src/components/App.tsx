/// <reference path="../boardgame.io.d.ts" />

import { Client } from "boardgame.io/react";
import { GameBoard } from "./GameBoard";
import CrystalHunt from "../Game";

const url =
  process.env.NODE_ENV === "development"
    ? "localhost:7000"
    : "crystal-hunt.appspot.com";

console.log("target url", url);

const App = Client({
  game: CrystalHunt,
  board: GameBoard,
  multiplayer: {
    server: url
  }
});

export default App;
