/// <reference path="./boardgame.io.d.ts" />

import { Client } from "boardgame.io/react";
import { GameBoard } from "./GameBoard";
import CrystalHunt from "./Game";

const App = Client({
  game: CrystalHunt,
  board: GameBoard,
  multiplayer: {
    server: "localhost:9000"
  }
});

export default App;
