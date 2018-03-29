/// <reference path="../boardgame.io.d.ts" />

import { Client } from "boardgame.io/react";
import { GameBoard } from "./GameBoard";
import CrystalHunt from "../Game";

console.log(process.env.server_url);

const App = Client({
  game: CrystalHunt,
  board: GameBoard,
  multiplayer: {
    // server: "localhost:7000"
    server: "crystal-hunt.appspot.com"
  }
});

export default App;
