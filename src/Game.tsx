import { SimpleGame, GameContext, PlayerContext } from "./types/index";
import { Game } from "boardgame.io/core";
import { SkillName } from "./action/skillLib";
import { basicMap } from "./map/mapDefinitions";
import {
  getSkill,
  getSelectedSkillName,
  getAvatarOnCell,
  getHealth
} from "./state/getters";
import { setSelectedSkill, setEndTurn } from "./state/setters";
import { loadSkill } from "./action/Skill";
import { triggerPower } from "./action/Power";
import { Cell } from "./map/Cell";

function initPlayerContext(playerId: string): PlayerContext {
  return {
    playerID: playerId,
    skills: [loadSkill("Move"), loadSkill("Cristallize"), loadSkill("Attack")],
    selectedSkill: null,
    caracs: {
      healthInit: 5,
      healthCurrent: 5,
      attackValue: 1
    }
  };
}

const CrystalHunt = Game({
  setup: () => ({
    cells: [0, 0, 0],
    map: basicMap,
    player0Position: "0x0",
    player1Position: "2x2",
    playersContext: { 0: initPlayerContext("0"), 1: initPlayerContext("1") }
  }),
  moves: {
    // it seems that G and ctx are injected
    activateCell: (G: SimpleGame, ctx: GameContext, cellXY: number[]) => {
      /* activateCell Workflow :
        - Retrieve Skill (TODO : failover if no skill)
        - Trigger Skill (TODO : check prior conditions)
        - Unselect skill
        - endTurn
        TODO : Log the action, to display to players.
        */
      const selectedSkillName = getSelectedSkillName(G, ctx.currentPlayer);
      const selectedSkill = getSkill(G, ctx.currentPlayer, selectedSkillName);
      const playerMoved = triggerPower(
        selectedSkill,
        G,
        ctx,
        Cell.toKey(cellXY[0], cellXY[1])
      );
      const skillSaved: SimpleGame = setSelectedSkill(
        playerMoved,
        null,
        ctx.currentPlayer
      );
      const endTurn: SimpleGame = setEndTurn(skillSaved, true);
      return endTurn;
    },
    activateSkill: (G: SimpleGame, ctx: GameContext, skillName: SkillName) => {
      /* activateSkill workflow :
        - Check if TargetRequired, Select the skill and wait for target.
        - If not, Trigger the power, end turn.
        TODO : Preview the legal targets.
      */
      console.log("Activating " + skillName + " skill");
      const skill = getSkill(G, ctx.currentPlayer, skillName);
      if (skill.isTargetRequired) {
        console.log("Skill " + skillName + " is selected");
        // SelectedSkill is stored in the state.
        const skillSaved: SimpleGame = setSelectedSkill(
          G,
          skillName,
          ctx.currentPlayer
        );
        return skillSaved;
      } else {
        console.log("Skill " + skillName + " is triggered");
        // State is modified by the power.
        const powerTriggered = triggerPower(skill, G, ctx, "");
        // EndTurn is triggered.
        const TurnEnded = setEndTurn(powerTriggered, true);
        return TurnEnded;
      }
    }
  },

  flow: {
    // EndGame workflow, checking victory conditions, returning winner playerId
    endGameIf: (G: SimpleGame, ctx: GameContext) => {
      const avatarOnCentralCell = getAvatarOnCell(G, "1x1");
      // Checking player on centrall Cell
      if (avatarOnCentralCell > -1) {
        return avatarOnCentralCell;
      }
      // Checking player0 is alive
      if (getHealth(G, "0") < 1) {
        return 1;
      }
      // Checking player1 is alive
      if (getHealth(G, "1") < 1) {
        return 0;
      }
      return;
    },
    endTurnIf: (G: SimpleGame, ctx: GameContext) => G.endTurn,
    onTurnEnd: (G: SimpleGame, ctx: GameContext) => setEndTurn(G, false),
    phases: [
      {
        name: "Choose Skill",
        allowedMoves: ["activateSkill"],
        endPhaseIf: (G: SimpleGame, ctx: GameContext) => {
          return getSelectedSkillName(G, ctx.currentPlayer) !== null;
        }
      },
      {
        name: "Choose Cell",
        allowedMoves: ["activateCell"],
        endPhaseIf: (G: SimpleGame, ctx: GameContext) => {
          return getSelectedSkillName(G, ctx.currentPlayer) === null;
        }
      }
    ]
  }
});

export default CrystalHunt;
