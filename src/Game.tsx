import { SimpleGame, GameContext, PlayerContext } from "./types/index";
import { Skill } from "./skill/Skill";
import { Game } from "boardgame.io/core";
import { getSkill, getSkillPower } from "./skill/skillLib";
import { basicMap } from "./map/mapDefinitions";
import { Map } from "./map/Map";

function setSelectedSkill(
  G: SimpleGame,
  skillValue: Skill | null,
  playerId: string
): SimpleGame {
  return {
    ...G,
    playersContext: {
      ...G.playersContext,
      [playerId]: {
        ...G.playersContext[playerId],
        selectedSkill: skillValue
      }
    }
  };
}

function initPlayerContext(playerId: string): PlayerContext {
  return {
    playerID: playerId,
    skills: [getSkill("Move")],
    selectedSkill: null
  };
}

const CrystalHunt = Game({
  setup: () => ({
    cells: [0, 0, 0],
    map: basicMap,
    playersContext: { 0: initPlayerContext("0"), 1: initPlayerContext("1") }
  }),
  moves: {
    // it seems that G and ctx are injected
    activateCell: (G: SimpleGame, ctx: GameContext, cellXY: number[]) => {
      console.log("Chosen cell is", cellXY);
      // TODO fake move
      const mapAfterMove = Map.playerMove(cellXY);
      const skillSaved: SimpleGame = setSelectedSkill(
        G,
        null,
        ctx.currentPlayer
      );
      return { ...skillSaved, map: mapAfterMove };
    },
    activateSkill: (G: SimpleGame, ctx: GameContext, skill: Skill) => {
      console.log("Activating " + skill.name + " skill");
      const skillSaved: SimpleGame = setSelectedSkill(
        G,
        skill,
        ctx.currentPlayer
      );
      return getSkillPower(skill.name)(skillSaved);
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
          return G.playersContext[ctx.currentPlayer].selectedSkill !== null;
        }
      },
      {
        name: "Choose Cell",
        allowedMoves: ["activateCell"],
        endPhaseIf: (G: SimpleGame, ctx: GameContext) => {
          return G.playersContext[ctx.currentPlayer].selectedSkill === null;
        }
      }
    ]
  }
});

export default CrystalHunt;
