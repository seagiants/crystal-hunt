/// <reference path="../boardgame.io.d.ts" />

import { Client } from "boardgame.io/react";
import { GameBoard } from "./GameBoard";
import CrystalHunt from "../Game";

const url =
  process.env.NODE_ENV === "development"
    ? "localhost:7000"
    : "crystal-hunt.appspot.com";

// const isDebugActive = process.env.NODE_ENV === "development";
const isDebugActive = true;

const CrystalHuntClient = Client({
  game: CrystalHunt,
  board: GameBoard,
  multiplayer: {
    server: url
  },
  debug: isDebugActive
});

export default CrystalHuntClient;
