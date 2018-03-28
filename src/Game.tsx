import { SimpleGame, GameContext, PlayerContext } from "./types/index";
import { Game } from "boardgame.io/core";
import { SkillName } from "./action/skillLib";
import { initMapSetup } from "./map/mapDefinitions";
import {
  getSkill,
  getSelectedSkillName,
  getAvatarOnCell,
  getHealth
} from "./state/getters";
import {
  setSelectedSkill,
  setEndTurn,
  cleanDeadMonsters,
  setCards,
  plugCard
} from "./state/setters";
import { loadSkill } from "./action/Skill";
import { triggerPower } from "./action/Power";
import { toKey } from "./map/Cell";
import { triggerMonsterSkill } from "./map/Avatar";
import { Avatar } from "./map/type";
// import { loadCard } from "./action/Card";

function initPlayerContext(playerId: string): PlayerContext {
  return {
    playerID: playerId,
    skills: [
      loadSkill("Move"),
      loadSkill("Draw"),
      loadSkill("Cristallize"),
      loadSkill("Attack")
    ],
    selectedSkill: null,
    caracs: {
      healthInit: 5,
      healthCurrent: 5,
      attackValue: 1
    },
    cards: []
  };
}

const CrystalHunt = Game({
  setup: () => {
    // let map = basicMap;
    // let avatars = [initPlayerAvatar("0"),initPlayerAvatar("1"),initMonsterAvatar("M2")];
    const basicSetup = initMapSetup();
    return {
      map: basicSetup.basicMap,
      playersContext: { 0: initPlayerContext("0"), 1: initPlayerContext("1") },
      avatars: basicSetup.basicAvatars,
      equipmentPlayer0: {},
      equipmentPlayer1: {}
    };
  },
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
        toKey(cellXY[0], cellXY[1])
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
    },
    activateCard: (
      G: SimpleGame,
      ctx: GameContext,
      cardIndex: number,
      playerId: string
    ) => {
      /* Pick Card workflow :
         - Plug the card
         - Clean card board 
         - EndTurn is triggered.
      */
      const cardPlugged = plugCard(G, playerId, cardIndex);
      const cardsCleaned = setCards(cardPlugged, playerId, []);
      const turnEnded = setEndTurn(cardsCleaned, true);
      return turnEnded;
    }
  },

  flow: {
    // EndGame workflow, checking victory conditions, returning winner playerId
    endGameIf: (G: SimpleGame, ctx: GameContext) => {
      const avatarOnCentralCell = getAvatarOnCell(G, "1x1");
      // Checking player on centrall Cell
      if (avatarOnCentralCell !== null) {
        return avatarOnCentralCell;
      }
      // Checking player0 is alive
      if (getHealth(G, "0") < 1) {
        return "1";
      }
      // Checking player1 is alive
      if (getHealth(G, "1") < 1) {
        return "0";
      }
      return;
    },
    endTurnIf: (G: SimpleGame, ctx: GameContext) => G.endTurn,
    onTurnEnd: (G: SimpleGame, ctx: GameContext) => {
      const deadMonstersCleaned: SimpleGame = cleanDeadMonsters(G);
      return setEndTurn(deadMonstersCleaned, false);
    },
    onTurnBegin: (G: SimpleGame, ctx: GameContext) => {
      let monsters = G.avatars.filter(avatar => avatar.type === "Monster");
      // console.log("monsters :");
      // console.log(monsters);
      let tempG = { ...G };
      // Each monster will trigger their skill then pass the state to the next.
      let reducer = (prevG: SimpleGame, currMonster: Avatar) =>
        triggerMonsterSkill(prevG, ctx, currMonster.id);
      return monsters.reduce(reducer, tempG);
    },
    phases: [
      {
        name: "Choose Skill",
        allowedMoves: ["activateSkill", "activateCard"],
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
