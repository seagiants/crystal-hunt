/// <reference path="../boardgame.io.d.ts" />

import { Client } from "boardgame.io/react";
import { GameBoard } from "./GameBoard";
import CrystalHunt from "../Game";

let url =
  process.env.NODE_ENV === "development"
    ? "localhost:7000"
    : "crystal-hunt.appspot.com";

// overriding using the docker SERVER_URL when existing
if (process.env.SERVER_URL) {
  url = process.env.SERVER_URL;
}

console.log(url);

// const isDebugActive = process.env.NODE_ENV === "development";
const isDebugActive = false;

const CrystalHuntClient = Client({
  game: CrystalHunt,
  board: GameBoard,
  multiplayer: {
    server: "://localhost:8081"
  },
  debug: isDebugActive
});

export default CrystalHuntClient;
