import { SimpleGame, GameContext, PlayerContext } from "./types/index";
import { Skill } from "./skill/Skill";
import { Game } from "boardgame.io/core";
import { getSkillJSON, SkillName } from "./skill/skillLib";
import { basicMap } from "./map/mapDefinitions";
import {
  getSkill,
  getSelectedSkillName,
  getAvatarOnCell
} from "./state/getters";
import { setSelectedSkill } from "./state/setters";

function initPlayerContext(playerId: string): PlayerContext {
  return {
    playerID: playerId,
    skills: [getSkillJSON("Move")],
    selectedSkill: null
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
        TODO : Log the action, to display to players.
        */
      const selectedSkillName = getSelectedSkillName(G, ctx.currentPlayer);
      const skill = new Skill(
        getSkill(G, ctx.currentPlayer, selectedSkillName)
      );
      const playerMoved = skill.power(G, ctx, ctx.currentPlayer, cellXY);
      const skillSaved: SimpleGame = setSelectedSkill(
        playerMoved,
        null,
        ctx.currentPlayer
      );
      console.dir(playerMoved);
      return skillSaved;
    },
    activateSkill: (G: SimpleGame, ctx: GameContext, skillName: SkillName) => {
      /* activateSkill workflow :
        - Check if TargetRequired => Select the skill and wait for target. Break.
        - Trigger the power.
        TODO : Check if target needed, and then select or trigger the skill
      */
      console.log("Activating " + skillName + " skill");
      const skill: Skill = new Skill(getSkill(G, ctx.currentPlayer, skillName));
      if (skill.isTargetRequired) {
        console.log("Skill " + skillName + " is selected");        
        const skillSaved: SimpleGame = setSelectedSkill(
          G,
          skillName,
          ctx.currentPlayer
        );
        return skillSaved;
      } else {
        console.log("Skill " + skillName + " is triggered");
        const triggerPower = skill.power(G, ctx, ctx.currentPlayer, {});
        return triggerPower;
      }
    }
  },

  flow: {
    endGameIf: (G: SimpleGame, ctx: GameContext) => {
      const avatarOnCentralCell = getAvatarOnCell(G, 1, 1);
      if (avatarOnCentralCell > -1) {
        return true;
      }
      return;
    },
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
