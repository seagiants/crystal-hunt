/// <reference path="./boardgame.io.d.ts" />

import { Client } from "boardgame.io/react";
import { Game } from "boardgame.io/core";
// import { CellsBoard } from "./CellsBoard";
import { GameBoard } from "./GameBoard";
import { SimpleGame, GameContext } from "./types/index";

const makeThree = Game({
  setup: () => ({ cells: [0, 0, 0], skills: ["Dexterity"], selectedSkill: null }),
  moves: {
    // it seems that G and ctx are injected
    activateCell: (G: SimpleGame, ctx: object, index: number) => {
      let cells = [...G.cells];
      cells[index] = 1;
      return { ...G, cells, selectedSkill: null };
    },
    activateSkill: (G: SimpleGame, ctx: object, skill: string) => {
      console.log(skill);
      return {...G, selectedSkill: skill};
    }
  },

  flow: {
    endGameIf: (G: SimpleGame, ctx: GameContext) => {
      const sumOfCells = G.cells.reduce((a: number, b: number) => a + b);
      console.log("sum of cells", sumOfCells);
      if (sumOfCells === 3) {
        return ctx.currentPlayer;
      } else {
        return;
      }
    },
    phases: [
      {
        name: "Choose Skill",
        allowedMoves: ["activateSkill"],
        endPhaseIf: (G: SimpleGame, ctx: object) => {
          return G.selectedSkill;
        }
      },
      {
        name: "Choose Cell",
        allowedMoves: ["activateCell"],
        endPhaseIf: (G: SimpleGame, ctx: object) => {
          return (G.selectedSkill === null);
        }
      }
    ]
  }
});

const App = Client({ game: makeThree, board: GameBoard });

export default App;
