import { SimpleGame, GameContext } from "./types/index";
import { Game } from "boardgame.io/core";

const CrystalHunt = Game({
  setup: () => ({
    cells: [0, 0, 0],
    skills: ["Dexterity"],
    selectedSkill: null
  }),
  moves: {
    // it seems that G and ctx are injected
    activateCell: (G: SimpleGame, ctx: object, index: number) => {
      let cells = [...G.cells];
      cells[index] = 1;
      return { ...G, cells, selectedSkill: null };
    },
    activateSkill: (G: SimpleGame, ctx: object, skill: string) => {
      console.log(skill);
      return { ...G, selectedSkill: skill };
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
        endPhaseIf: (G: SimpleGame, ctx: GameContext) => {
          return G.selectedSkill !== null;
        }
      },
      {
        name: "Choose Cell",
        allowedMoves: ["activateCell"],
        endPhaseIf: (G: SimpleGame, ctx: GameContext) => {
          return G.selectedSkill === null;
        }
      }
    ]
  }
});

export default CrystalHunt;
